const Watchlist = require('../models/Watchlist');
const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5001/api/users';
const CATALOG_SERVICE_URL = process.env.CATALOG_SERVICE_URL || 'http://localhost:5002/api/catalog';

exports.addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.userId; // From auth middleware

    // 1. Validate User via User Service
    try {
      await axios.get(`${USER_SERVICE_URL}/validate/${userId}`);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }

    // 2. Validate Movie via Catalog Service
    try {
      await axios.get(`${CATALOG_SERVICE_URL}/${movieId}`);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid Movie ID' });
    }

    // 3. Add to Watchlist
    const existingEntry = await Watchlist.findOne({ userId, movieId });
    if (existingEntry) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    const newWatchlistEntry = new Watchlist({
      userId,
      movieId,
      status: 'saved'
    });

    await newWatchlistEntry.save();
    res.status(201).json({ message: 'Added to watchlist', item: newWatchlistEntry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    
    // Ensure the current authenticated user is modifying their own watchlist
    if (req.user.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to modify this watchlist' });
    }

    await Watchlist.findOneAndDelete({ userId, movieId });
    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const watchlist = await Watchlist.find({ userId });
    
    // In a more complex system, we might fetch movie details from Catalog Service here.
    // To keep it simple, we just return the watchlist items.
    
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.checkIfSaved = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const entry = await Watchlist.findOne({ userId, movieId });
    if (entry) {
      return res.json({ isSaved: true, status: entry.status });
    }
    res.json({ isSaved: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { movieId, status } = req.body;
    const userId = req.user.userId;

    const validStatuses = ['saved', 'watched'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedEntry = await Watchlist.findOneAndUpdate(
      { userId, movieId },
      { status },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Item not found in watchlist' });
    }

    res.json({ message: 'Status updated', item: updatedEntry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
