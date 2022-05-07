// Author: Purvilkumar Bharthania (B00901605)

const { reports } = require("../models");

//Report Root
const reportRoot = (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    return res
      .status(200)
      .json({ message: "Welcome to Report Module", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getAllReports = async (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    const listOfReports = await reports.findAll();
    if (!listOfReports || !listOfReports.length) {
      return res
        .status(404)
        .json({ message: "No Reports available!!", success: false });
    }
    return res.status(200).json({
      message: "Reports retrieved",
      success: true,
      data: listOfReports,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      message: "Unable to get all Reports!!",
      success: false,
    });
  }
};

const addReport = async (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    await reports.create(req.body).then(() => {
      return res
        .status(201)
        .json({ message: "Property Reported Successfully", success: true });
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Unable to Report Property!!",
      success: false,
    });
  }
};

const getReport = async (req, res) => {
  try {
    const user = req.params.userId;
    const property = req.params.propertyId;
    const report = await reports.findOne({
      where: { user_id: user, property_id: property },
    });

    if (!report) {
      res.status(404).json({
        message: "No Report Details Available",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "Report Retrieved Successfully",
        success: true,
        report: report,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!!",
      success: false,
      error: error.message,
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    const user = req.params.userId;
    const property = req.params.propertyId;
    const report = await reports.findOne({
      where: { user_id: user, property_id: property },
    });

    if (!report) {
      return res
        .status(404)
        .json({ message: "Report not found!!", success: false });
    }

    await reports
      .destroy({
        where: {
          user_id: user,
          property_id: property,
        },
      })
      .then(() => {
        return res.status(200).json({
          message: "Property Report Canceled Successfully",
          success: true,
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unable to Cancel Report!!",
      success: false,
    });
  }
};

const deleteAllReports = async (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    const property = req.params.propertyId;
    const report = await reports.findAll({
      where: { property_id: property },
    });

    if (!report) {
      return res
        .status(404)
        .json({ message: "Report not found!!", success: false });
    }

    await reports
      .destroy({
        where: {
          property_id: property,
        },
      })
      .then(() => {
        return res.status(200).json({
          message: "Property Reports Deleted Successfully",
          success: true,
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unable to Delete Report!!",
      success: false,
    });
  }
};

const getTotalReports = async (req, res) => {
  try {
    const property = req.params.propertyId;
    const report = await reports.findAll({
      where: { property_id: property },
    });

    const count = await reports.count({
      where: {
        property_id: property,
      },
    });

    if (!report) {
      res.status(404).json({
        message: "No Report Details Available",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "Report Retrieved Successfully",
        success: true,
        count: count,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!!",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  reportRoot,
  getAllReports,
  addReport,
  deleteReport,
  getReport,
  deleteAllReports,
  getTotalReports,
};
