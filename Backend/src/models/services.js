// Author: Pankti Vyas (B00886309)

module.exports = (sequelize, DataTypes) => {
    const Services = sequelize.define("services", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        userid: {
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        }
    });

    return Services;
};