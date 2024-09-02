require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors'); // Import CORS middleware
const { sequelize } = require('./models'); // Import sequelize correctly
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const coinRoutes = require('./routes/coinRoutes');
const youtubeRoute = require('./routes/youtubeRoute'); // Corrected require statement
const exchangeRoute = require('./routes/exchangeRoute');
const app = express();
// Enable CORS for all routes
app.use(cors({
    origin: '*',  // Replace with your frontend's URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));

sequelize.authenticate()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/coin', coinRoutes);
app.use('/api/youtube', youtubeRoute);
app.use('/api/exchange', exchangeRoute);
module.exports = app;
