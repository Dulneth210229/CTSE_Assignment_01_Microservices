const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');

router.post('/', catalogController.addMovie);
router.get('/', catalogController.getAllMovies);
router.get('/search', catalogController.searchMovies);
router.get('/:movieId', catalogController.getMovieById);
router.get('/:movieId/stream-info', catalogController.getStreamInfo);

module.exports = router;
