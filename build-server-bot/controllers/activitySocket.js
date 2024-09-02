const { getUserCoins } = require('../controllers/activityController');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        // Listen for an event to get user coins
        socket.on('getUserCoins', () => {
            getUserCoins(socket);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

/*
const socket = io.connect('http://localhost:5000', {
    query: { userId: 'USER_ID_HERE' } // Replace with the actual user ID
});

// Emit the event to retrieve coins
socket.emit('getUserCoins');

// Listen for the coins data
socket.on('userCoins', (data) => {
    console.log('User coins:', data.coins);
});

// Optionally handle errors
socket.on('error', (error) => {
    console.error('Error:', error.error);
});
*/
