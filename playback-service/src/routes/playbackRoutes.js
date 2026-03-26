const express = require('express');
const router = express.Router();
const playbackController = require('../controllers/playbackController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/start', authMiddleware, playbackController.startPlayback);
router.post('/history', authMiddleware, playbackController.saveHistory);
router.get('/history/:userId', authMiddleware, playbackController.getHistory);
router.get('/continue/:userId', authMiddleware, playbackController.getContinueWatching);
router.post('/complete', authMiddleware, playbackController.completeMovie);

module.exports = router;
