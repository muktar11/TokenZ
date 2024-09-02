const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubeController');

// Route to create a new coin
router.post('/post', youtubeController.createYoutubevideo);
// Route to delete a coin by ID
router.delete('/post/:id', youtubeController.deleteYoutubevideo);
// Route to get a youtube url
router.get('/get', youtubeController.getAllUrl);

module.exports = router;
