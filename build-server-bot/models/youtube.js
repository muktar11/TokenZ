// models/activity.js

const { DataTypes } = require("sequelize");


module.exports = (sequelize, DataTypes) =>  {
    const Youtubevideo = sequelize.define('Youtubevideo', {
        url: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    });
    return Youtubevideo;
};

