// Author: Arvinder Singh (B00878415)

const { ratings, appointments, properties} = require("../models");

// get all ratings based on user_id
const getAllRatings = async (req, res) => {
    try {
        const listOfRatings = await ratings.findAll({
            where: {
                user_id: req.params.userId
            }
        });
        if (!listOfRatings || !listOfRatings.length) {
            res.status(404).json({
                message: "No Rating Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Ratings Retrieved",
                success: true,
                ratings: listOfRatings
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

// get the rating details based on user_id and property_id
const getRating = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const rating = await ratings.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!rating) {
            res.status(404).json({
                message: "No Rating Available",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Rating Retrieved",
                success: true,
                rating: rating
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

// add a new rating
const addRating = async (req, res) => {
    try {
        await ratings.create(req.body).then(() => {
            res.status(201).json({
                message: "Rating Added",
                success: true
            })
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

// update the rating
const updateRating = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const rating = await ratings.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!rating) {
            res.status(404).json({
                message: "Rating not available",
                success: false
            })
        } else {
            await ratings.update(req.body, {
                where: { rating_id: rating.dataValues.rating_id }
            }).then( () => {
                res.status(200).json({
                    message: "Rating Updated",
                    success: true
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

// delete a rating
const deleteRating = async (req, res) => {
    try {
        const user = req.params.userId;
        const property = req.params.propertyId;
        const rating = await ratings.findOne({
            where: { user_id: user, property_id: property }
        })

        if (!rating) {
            res.status(404).json({
                message: "Rating not available",
                success: false
            })
        } else {
            await ratings.destroy({
                where: { rating_id: rating.rating_id }
            }).then(() => {
                res.status(200).json({
                    message: "Rating Deleted",
                    success: true
                })
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: err.message
        })
    }
};

// get the list of properties available for particular user to provide or update ratings
const getUserRatings = async (req, res) => {
    try {
        const listMyAppointments = await appointments.findAll({
            where: { user_id: req.params.userId }
        })
        if (!listMyAppointments || !listMyAppointments.length) {
            res.status(404).json({
                message: "No Appointment Available",
                success: false
            })
        } else {
            const numOfRatings = listMyAppointments.length;
            let listOfRatings = [];
            for (let i = 0; i < numOfRatings; i++) {
                const user = listMyAppointments[i].user_id;
                const property = listMyAppointments[i].property_id;
                let count = 0;
                for (let j = 0; j < listOfRatings.length; j++) {
                    if (listOfRatings[j].user_id === user && listOfRatings[j].property_id === property) {
                        count = 1;
                    }
                }

                if (count === 0) {
                    const rating = await ratings.findOne({
                        where: {user_id: user, property_id: property}
                    })
                    if (!rating) {
                        const propertyImg = await properties.findOne({
                            where: {id: property}
                        })
                        if (propertyImg) {
                            let image = "";
                            if (!propertyImg.dataValues.image || propertyImg.dataValues.image === "") {
                                image = ''
                            } else {
                                image = propertyImg.dataValues.image;
                            }
                            listOfRatings.push({
                                user_id: user,
                                property_id: property,
                                images: image,
                                rating_id: "",
                                rating: -1
                            })
                        }
                    } else {
                        const propertyImg = await properties.findOne({
                            where: {id: property}
                        })
                        if (propertyImg) {
                            let image = "";
                            if (!propertyImg.dataValues.image || propertyImg.dataValues.image === "") {
                                image = ''
                            } else {
                                image = propertyImg.dataValues.image;
                            }
                            listOfRatings.push({
                                user_id: user,
                                property_id: property,
                                images: image,
                                rating_id: rating.dataValues.rating_id,
                                rating: rating.dataValues.rating
                            })
                        }
                    }
                }
            }
            res.status(200).json({
                message: "Ratings Retrieved",
                success: true,
                ratings: listOfRatings
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
}

// get the average rating of a property based on all ratings available for that property
const getAvgPropertyRatings = async (req, res) => {
    try {
        const property = req.params.propertyId;
        const propertRatings = await ratings.findAll({
            where: {property_id: property}
        })

        if (!propertRatings || !propertRatings.length) {
            res.status(404).json({
                message: "No rating available",
                success: false
            })
        } else {
            const numOfRatings = propertRatings.length;
            let sumOfRatings = 0;
            for (let i=0; i<numOfRatings; i++) {
                sumOfRatings = sumOfRatings + Number(propertRatings[i].dataValues.rating);
            }
            const avgRating = sumOfRatings / numOfRatings;
            res.status(200).json({
                property_id: property,
                averageRating: avgRating,
                success: true
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!",
            success: false,
            error: err.message
        })
    }
}

module.exports = { addRating, getAllRatings, getRating, updateRating, deleteRating, getUserRatings, getAvgPropertyRatings };