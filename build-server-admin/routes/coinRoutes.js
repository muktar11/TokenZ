const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');

// Route to create a new coin
router.post('/post', coinController.createCoin);

// Route to delete a coin by ID
router.delete('/coin/:id', coinController.deleteCoin);
//Route to retireve the coin
router.get('/get/coin', coinController.getAllCoin);
module.exports = router;
