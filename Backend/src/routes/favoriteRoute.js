// Author: Viren Babubhai Malavia (B00895669)

const express = require("express");
const router = express.Router();
const {
  getAllFavorites,
  getFavorite,
  addFavorite,
  removeFavorite,
} = require("../controllers/favoriteController");

router.get("/:userId", getAllFavorites); // to get all posts
router.get("/:userId/:propertyId", getFavorite); //to check if a property is added to Favorites or not
router.post("/", addFavorite); // to add a post to Favorites
router.delete("/:userId/:propertyId", removeFavorite); // to remove a post from Favorites

module.exports = router;
