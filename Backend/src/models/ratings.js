// Author: Arvinder Singh (B00878415)

module.exports = (sequelize, DataTypes) => {
    const Ratings = sequelize.define('ratings', {
        rating_id: {
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
        rating: {
            type: DataTypes.DECIMAL(10,6)
        }
    });
    return Ratings;
}