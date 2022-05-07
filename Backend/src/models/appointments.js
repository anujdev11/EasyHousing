// Author: Arvinder Singh (B00878415)

module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define('appointments', {
        appointment_id: {
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
        appointment_date: {
            type: DataTypes.DATE
        },
        appointment_time: {
            type: DataTypes.TIME
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Appointments;
}