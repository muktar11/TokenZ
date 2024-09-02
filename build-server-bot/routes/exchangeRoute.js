const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');

// Route to create a new coin
router.post('/post', exchangeController.createExchange);
// Route to delete a coin by ID
router.delete('/exchnage/:id', exchangeController.deleteExchange);
//Route to retireve the coinn
router.get('/get/exchange', exchangeController.getAllExchange);
module.exports = router;
