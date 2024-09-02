// routes/activityRoutes.js
const express = require('express');
const { increaseCoins, redeemCoin, } = require('../controllers/activityController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/tap', authenticate, increaseCoins);
router.post('/reddem', authenticate, redeemCoin)
module.exports = router;
