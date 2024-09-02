// models/activity.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>  {
    const Exchange = sequelize.define('Exchange', {
        currencytype: {
            type: DataTypes.STRING,
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
    return Exchange;
}