require('dotenv').config(); // Load environment variables

const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const ActivityModel = require('./activity');
const CoinModel = require('./coin');
const YoutubevideoModel = require('./youtube'); // Correct model import
const ExchangeModel = require('./Exchange');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Set to true if you have a proper SSL certificate
        }
    },
    logging: false,
});

const User = UserModel(sequelize, Sequelize);
const Activity = ActivityModel(sequelize, Sequelize);
const Coin = CoinModel(sequelize, Sequelize);
const Youtubevideo = YoutubevideoModel(sequelize, Sequelize); // Use the correct model
const Exchange = ExchangeModel(sequelize, Sequelize);

User.hasMany(Activity, { foreignKey: 'userId' });
Activity.belongsTo(User, { foreignKey: 'userId' });
Coin.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = {
    sequelize,
    User,
    Activity,
    Coin,
    Youtubevideo,
    Exchange,
};

