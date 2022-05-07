// Author: Arvinder Singh (B00878415)

const express = require("express");
const router = express.Router();
const { addRating } = require("../controllers/ratingController");
const { getAllRatings } = require("../controllers/ratingController");
const { getRating } = require("../controllers/ratingController");
const { updateRating } = require("../controllers/ratingController");
const { deleteRating } = require("../controllers/ratingController");
const { getUserRatings } = require("../controllers/ratingController");
const { getAvgPropertyRatings } = require("../controllers/ratingController");

router.get("/getAvgPropertyRatings/:propertyId", getAvgPropertyRatings);
router.get("/getUserRatings/:userId", getUserRatings);
router.get("/getAllRatings/:userId", getAllRatings);
router.get("/getRating/:userId/:propertyId", getRating);
router.post("/addRating", addRating);
router.put("/updateRating/:userId/:propertyId", updateRating);
router.delete("/deleteRating/:userId/:propertyId", deleteRating);

module.exports = router;