// Author: Viren Babubhai Malavia (B00895669)

const { favorites } = require("../models");

//Favorites Root
const favoriteRoot = (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    return res
      .status(200)
      .json({ message: "Welcome to Favorites Module", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

//Retrieve all favorite posts
const getAllFavorites = async (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    const listOfFavorites = await favorites.findAll({
      where: { user_id: req.params.userId, isFavorite: true },
    });

    if (!listOfFavorites || !listOfFavorites.length) {
      return res.status(404).json({
        message: "Favorites not found!",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "Favorites retrieved successfully",
        success: true,
        favorites: listOfFavorites,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      error: error.message,
      success: false,
    });
  }
};

//Check if the post exists in Favorites or not
const getFavorite = async (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    const userID = req.params.userId;
    const propertyID = req.params.propertyId;
    const retrievedFavorite = await favorites.findOne({
      where: { user_id: userID, property_id: propertyID, isFavorite: true },
    });

    if (!retrievedFavorite) {
      return res.status(200).json({
        message: "Favorite not found!",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "Favorite retrieved successfully",
        success: true,
        favorite: retrievedFavorite,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      error: error.message,
      success: false,
    });
  }
};

//Add post to Favorites
const addFavorite = async (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    await favorites.create(req.body).then(() => {
      return res.status(201).json({
        message: "Post added to Favorites",
        success: true,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      error: error.message,
      success: false,
    });
  }
};

const removeFavorite = async (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    const userID = req.params.userId;
    const propertyID = req.params.propertyId;
    const retrievedFavorite = await favorites.findOne({
      where: { user_id: userID, property_id: propertyID, isFavorite: true },
    });

    if (!retrievedFavorite) {
      return res.status(404).json({
        message: "Post with the given ids not found in Favorites!",
        success: false,
      });
    } else {
      const favoriteID = retrievedFavorite.dataValues.favorite_id;
      await favorites
        .destroy({ where: { favorite_id: favoriteID } })
        .then(() => {
          return res.status(200).json({
            message: "Post removed from Favorites",
            success: true,
          });
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  favoriteRoot,
  getAllFavorites,
  getFavorite,
  addFavorite,
  removeFavorite,
};
