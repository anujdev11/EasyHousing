// Author: Purvilkumar Bharthania (B00901605)

const express = require("express");
const router = express.Router();

const {
  getAllReports,
  addReport,
  deleteReport,
  getReport,
  deleteAllReports,
  getTotalReports,
} = require("../controllers/reportController");

router.post("/addReport", addReport);
router.get("/getAllReports", getAllReports);
router.delete("/deleteReport/:userId/:propertyId", deleteReport);
router.get("/getReport/:userId/:propertyId", getReport);
router.delete("/deleteAllReports/:propertyId", deleteAllReports);
router.get("/getTotalReports/:propertyId", getTotalReports);

module.exports = router;
