const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, watchlistController.addToWatchlist);
router.delete('/:userId/:movieId', authMiddleware, watchlistController.removeFromWatchlist);
router.get('/:userId', authMiddleware, watchlistController.getUserWatchlist);
router.get('/:userId/check/:movieId', authMiddleware, watchlistController.checkIfSaved);
router.post('/status', authMiddleware, watchlistController.updateStatus);

module.exports = router;
