const { User, Coin, Activity } = require('../models/index'); // Adjust the path if different


exports.increaseCoins = async (req, res) => {
    try {
        // Find the user by their ID from the JWT token
       const user = await User.findByPk(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const coinsEarned = 1; // Define the coins earned per tap

        // Increase the user's coins
        user.coins += coinsEarned;
        await user.save();

        // Record the activity
        const activity = await Activity.create({
            userId: user.id,  // Ensure this is the correct reference
            activityType: 'tap',
            coinsEarned,
        });
        req.io.emit('coinsUpdated', { userId: user.id, coins: user.coins });
        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserCoins = async (socket) => {
    try {
        // Get the user ID from the socket handshake query or other methods
        const userId = socket.handshake.query.userId;
        console.log(`getUserCoins called with userId: ${userId}`);
        
        const user = await User.findByPk(userId);
        if (!user) {
            socket.emit('error', { error: 'User not found.' });
            return;
        }
        
        // Emit the user's current coin count
        socket.emit('userCoins', { coins: user.coins });
    } catch (error) {
        console.error('Error fetching user coins:', error);
        socket.emit('error', { error: error.message });
    }
};

// Define watchVideoEarnCoins function
exports.watchVideoEarnCoins = async (req, res) => {
    try {
        // Find the user by their ID from the JWT token
        const user = await User.findByPk(req.user.userId);
       
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const coinsEarned = 5; // Define the coins earned per video watch
        // Increase the user's coins
        user.coins += coinsEarned;
        await user.save();
        // Record the activity
        const activity = await Activity.create({
            userId: user.id,  // Ensure this is the correct reference
            activityType: 'video_watch',
            coinsEarned,
        });

        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.redeemCoin = async (req, res) => {
    try {
        const { userId, coinCode } = req.body;

        // Find the coin based on the provided code
        const coin = await Coin.findOne({ where: { code: coinCode } });

        if (!coin) {
            return res.status(404).json({ message: 'Coin code not found.' });
        }

        // Check if the coin is expired
        if (coin.expiry_date && new Date(coin.expiry_date) < new Date()) {
            return res.status(400).json({ message: 'Coin code has expired.' });
        }

        // Find the user
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Add the coin value to the user's coin count
        user.coins += coin.value;
        await user.save();

        return res.status(200).json({ message: 'Coin redeemed successfully.', coins: user.coins });
    } catch (error) {
        console.error('Error redeeming coin:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
