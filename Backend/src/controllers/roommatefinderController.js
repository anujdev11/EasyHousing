//Author: Lins George (B00895654)

const { roommateListings } = require("../models");
const { use } = require("../routes/roommateFinderRoute");

const RoomateFinderListingRoot = (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        res
            .status(200)
            .json({ message: "Welcome to Roommate finder Module", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllListing = async (req, res) => {
    try {
        const listings = await roommateListings.findAll();
        res.setHeader("Content_type", "application/json");
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const addListing = async (req, res) => {
    try {  
        await roommateListings.create(req.body).then(() => {
            res.status(200).json({ message: "Listing added", success: true });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false });
    }
}

const editListing = async (req, res) => {
    try {
        const id = req.params.id;
        await roommateListings.update(req.body, {
            where: {
                id: id
            }
        }).then(() => {
            return res.status(200).json({ message: "Listing Updated", success: true });
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const getListing = async (req, res) => {
    console.log(req.params.id);
    try {
        const id = req.params.id;
        const getMyListing = await roommateListings.findAll({ where: { postedUserId: id } });
        console.log(getMyListing);
        res.status(200).json(getMyListing);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const getListingById = async (req, res) => {
    try {
        const id = req.params.id;
        const getMyListing = await roommateListings.findByPk(id);
        res.status(200).json(getMyListing);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const deleteListing = async (req, res) => {
    try {
        const id = req.params.id;
        const s = await roommateListings.findByPk(id);
        await roommateListings.destroy({
            where: {
                id:id
            }
        }).then(() => {
            res.status(200).json(s);
        })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

module.exports = { RoomateFinderListingRoot };
module.exports = { getAllListing, addListing, editListing, getListing, deleteListing,getListingById  };
