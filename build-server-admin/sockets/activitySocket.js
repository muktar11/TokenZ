// sockets/activitySocket.js
const { User, Activity } = require('../models');
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('tap', async (userId) => {
            // Fetch user and update coins
            const user = await User.findByPk(userId);
            const coinsEarned = 1;
            user.coins += coinsEarned;
            await user.save();

            // Create a new activity
            const activity = await Activity.create({
                userId: user.id,
                activityType: 'tap',
                coinsEarned,
            });

            // Emit the updated user data to the client
            io.emit('updateCoins', { userId: user.id, coins: user.coins });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

