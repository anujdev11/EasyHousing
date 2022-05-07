// Author: Purvilkumar Bharthania (B00901605)

module.exports = (sequelize, Sequelize) => {
    const Properties = sequelize.define("properties", {
        title: {
            type: Sequelize.STRING,
            required: true,
        },
        description: {
            type: Sequelize.STRING,
        },
        bedrooms: {
            type: Sequelize.STRING,
            required: true,
        },
        bathrooms: {
            type: Sequelize.STRING,
            required: true,
        },
        unit_type: {
            type: Sequelize.STRING,
            required: true,
        },
        appliances: {
            type: Sequelize.STRING,
        },
        furnished: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            required: true,
        },
        sq_feet: {
            type: Sequelize.INTEGER,
            required: true,
        },
        image: {
            type: Sequelize.STRING,
            required: true,
        },
        location: {
            type: Sequelize.STRING,
            required: true,
        },
        city: {
            type: Sequelize.STRING,
            required: true,
        },
        email: {
            type: Sequelize.STRING,
            required: true,
        },
        phone_no: {
            type: Sequelize.STRING,
            required: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            required: true,
        },
        price: {
            type: Sequelize.INTEGER,
            required: true,
        },

    });
    return Properties;
};
