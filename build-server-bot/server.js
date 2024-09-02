const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const express = require('express');
const activitySocket = require('./sockets/activitySocket');
const { watchVideoEarnCoins, getUserCoins, increaseCoins } = require('./controllers/activityController');
const server = http.createServer(app);

const { User, Activity, Coin, Youtubevideo } = require('./models/index'); // Adjust the path if different
const io = socketIo(server);
activitySocket(io);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('getUserCoins', async (userId) => {
        try {
            const user = await User.findByPk(userId);
            if (user) {
                socket.emit('userCoins', { coins: user.coins });
                console.log('usercoins', user.coins);
                
                // Listen for changes in the database
                User.addHook('afterUpdate', async (updatedUser) => {
                    if (updatedUser.id === userId && updatedUser.coins !== user.coins) {
                        socket.emit('coinsUpdated', { userId: updatedUser.id, coins: updatedUser.coins });
                        console.log('Coins updated:', updatedUser.coins);
                    }
                });
            } else {
                socket.emit('error', { error: 'Users not found.' });
            }
        } catch (error) {
            console.error('Error fetching coins:', error);
            socket.emit('error', { error: error.message });
        }
    });

    socket.on('updateCoins', async (userId, coinsEarned) => {
        try {
            const user = await User.findByPk(userId);
            if (user) {
                user.coins += coinsEarned;
                await user.save();
                console.log('Coins updated for user:', user.id);
            } else {
                socket.emit('error', { error: 'User not found.' });
            }
        } catch (error) {
            console.error('Error updating coins:', error);
            socket.emit('error', { error: error.message });
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});