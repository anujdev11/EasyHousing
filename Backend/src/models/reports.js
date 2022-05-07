// Author: Purvilkumar Bharthania (B00901605)

module.exports = (sequelize, Sequelize) => {
    const Reports = sequelize.define("reports", {
        property_id: {
            type: Sequelize.INTEGER,
            required: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            required: true,
        },
    });
    return Reports;
};
