// Author: Arvinder Singh (B00878415)

const { appointments, properties } = require("../models");

// get all appointments of a user based on user_id
const getAllAppointments = async (req, res) => {
    try {
        const listOfAppointments = await appointments.findAll({
            where: { user_id: req.params.userId, isDeleted: false }
        });

        if (!listOfAppointments || !listOfAppointments.length) {
            res.status(404).json({
                message: "No Appointment Available",
                success: false
            })
        } else {
            const numOfAppointments = listOfAppointments.length;
            let appointmentList = [];
            for (let i=0; i<numOfAppointments; i++) {
                const user = listOfAppointments[i].user_id;
                const property = listOfAppointments[i].property_id;
                const propertyDetails = await properties.findOne({
                    where: { id: property }
                })
                if (propertyDetails) {
                    let image = "";
                    if (!propertyDetails.dataValues.image || propertyDetails.dataValues.image === "") {
                        image = ''
                    } else {
                        image = propertyDetails.dataValues.image
                    }
                    appointmentList.push({
                        appointment_id: listOfAppointments[i].appointment_id,
                        property_id: property,
                        user_id: user,
                        appointment_date: listOfAppointments[i].appointment_date,
                        appointment_time: listOfAppointments[i].appointment_time,
                        isDeleted: listOfAppointments[i].isDeleted,
                        property_image: image,
                        property_location: propertyDetails.location,
                        property_city: propertyDetails.city,
                        property_price: propertyDetails.property_price
                    })
                }
            }
            res.status(200).json({
                message: "Appointments Retrieved",
                success: true,
                appointments: appointmentList
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

// get appointment details based on user_id and property_id
const getAppointment = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const appointment = await appointments.findOne({
            where: { user_id: user, property_id: property, isDeleted: false }
        })

        if (!appointment) {
            res.status(404).json({
                message: "No Appointment Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Appointment Retrieved",
                success: true,
                appointment: appointment
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

// add an appointment
const addAppointment = async (req, res) => {
    try {
        await  appointments.create(req.body).then(() => {
            res.status(200).json({
                message: "Appointment Added",
                success: true
            })
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

// update the appointment details
const updateAppointment = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const appointment = await appointments.findOne({
            where: { user_id: user, property_id: property, isDeleted: false }
        })

        if (!appointment) {
            res.status(404).json({
                message: "Appointment not available",
                success: false
            })
        } else {
            const appointmentId = appointment.dataValues.appointment_id;
            await appointments.update(req.body, {
                where: { appointment_id: appointmentId }
            }).then( () => {
                res.status(200).json({
                    message: "Appointment Updated",
                    success: true
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

// mark the appointment as deleted
const deleteAppointment = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const appointment = await appointments.findOne({
            where: { user_id: user, property_id: property, isDeleted: false }
        })

        if (!appointment) {
            res.status(404).json({
                message: "Appointment not available",
                success: false
            })
        } else {
            const appointmentId = appointment.dataValues.appointment_id;
            await appointments.update( { isDeleted: true }, {
                where: { appointment_id: appointmentId }
            }).then( () => {
                res.status(200).json({
                    message: "Appointment marked deleted",
                    success: true
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
};

module.exports = { getAllAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment };