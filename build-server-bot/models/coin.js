// models/activity.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>  {
    const Coin = sequelize.define('Coin', {
        code: {
            type: DataTypes.STRING,
            defaultValue: 0,
        },
        value: {
            type: DataTypes.STRING,
            defaultValue: 0,
        },
        expiry_date: {
            type: DataTypes.DATE,
            
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
    return Coin;
}