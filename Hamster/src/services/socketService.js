// src/services/socketService.js
import io from 'socket.io-client';
let socket;
export const initiateSocketConnection = (token) => {
  socket = io('https://token-z.com:5000', {
    query: { token },
  });
  console.log('Connected to socket server');
};
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};
export const tap = (userId) => {
  if (socket) socket.emit('tap', userId);
};
export const subscribeToCoinUpdates = (callback) => {
  if (!socket) return true;
  socket.on('updateCoins', (data) => {
    console.log('Coin update received');
    return callback(null, data);
  });
};
