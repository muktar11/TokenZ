// models/activity.js

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
        activityType: {
            type: DataTypes.ENUM('tap', 'watch_video'),
            allowNull: false,
        },
        coinsEarned: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });

    return Activity;
};
