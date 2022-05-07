// Author: Arvinder Singh (B00878415)

module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define('reviews', {
        review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        property_id: {
            type: DataTypes.INTEGER,
            required: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            required: true
        },
        review: {
            type: DataTypes.TEXT
        }
    });
    return Reviews;
}