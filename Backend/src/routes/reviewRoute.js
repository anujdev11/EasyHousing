// Author: Arvinder Singh (B00878415)

const express = require("express");
const router = express.Router();
const { addReview } = require("../controllers/reviewController");
const { getAllReviews } = require("../controllers/reviewController");
const { getReview } = require("../controllers/reviewController");
const { updateReview } = require("../controllers/reviewController");
const { deleteReview } = require("../controllers/reviewController");
const { getUserReviews } = require("../controllers/reviewController");
const { getAllPropertyReviews } = require("../controllers/reviewController");

router.get("/getAllPropertyReviews/:propertyId", getAllPropertyReviews);
router.get("/getUserReviews/:userId", getUserReviews);
router.get("/getAllReviews/:userId", getAllReviews);
router.get("/getReview/:userId/:propertyId", getReview);
router.post("/addReview", addReview);
router.put("/updateReview/:userId/:propertyId", updateReview);
router.delete("/deleteReview/:userId/:propertyId", deleteReview);

module.exports = router;