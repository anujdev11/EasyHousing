// Author: Arvinder Singh (B00878415)

const express = require("express");
const router = express.Router();
const { getAllAppointments } = require("../controllers/appointmentController");
const { getAppointment } = require("../controllers/appointmentController");
const { addAppointment } = require("../controllers/appointmentController");
const { updateAppointment } = require("../controllers/appointmentController");
const { deleteAppointment } = require("../controllers/appointmentController");


router.get("/getAllAppointments/:userId", getAllAppointments);
router.get("/getAppointment/:userId/:propertyId", getAppointment);
router.post("/addAppointment", addAppointment);
router.put("/updateAppointment/:userId/:propertyId", updateAppointment);
router.put("/deleteAppointment/:userId/:propertyId", deleteAppointment);

module.exports = router;