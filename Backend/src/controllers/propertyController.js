// Author: Purvilkumar Bharthania (B00901605)

const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const { SALT_VALUE } = require("../config/index");
const { properties } = require("../models");

//Property Root
const propertyRoot = (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        return res.status(200).json({ message: "Welcome to Property Management Module", success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};


const getAllProperties = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        const listOfProperties = await properties.findAll();
        if (!listOfProperties || !listOfProperties.length) {
            return res.status(404).json({ message: "Properties details not found!!", success: false });
        }
        return res.status(200).json({ message: "Properties retrieved", success: true, data: listOfProperties });
    } catch (error) {
        return res.status(500).json({ message: error.message, message: "Unable to get all Properties details!!", success: false });
    }
};

const getProperty = async (req, res) => {

    try {
        res.setHeader("Content_type", "application/json");
        const property_id = req.params.id;
        const propertyById = await properties.findByPk(property_id);

        if (propertyById) {
            return res.status(200).json({ message: "Property retrieved from Id", success: true, data: propertyById });
        } else {
            return res.status(404).json({ message: "Property details not found!!", success: false });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Unable to get Property details from Id!!", success: false });
    }

};

const getMyProperties = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        const userId = req.params.userid;

        const propertyByUserId = await properties.findAll({ where: { user_id: userId } });
        if (!propertyByUserId || !propertyByUserId.length) {
            return res.status(404).json({ message: "Properties details not found!!", success: false });
        }
        return res.status(200).json({ message: "All the Properties of User retrieved.", success: true, data: propertyByUserId });

    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Unable to get Property details from Id!!", success: false });
    }
};

const createProperty = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        await properties.create(req.body).then(() => {
            return res.status(201).json({ message: "Property added Successfully", success: true });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Unable to add Property details!!", success: false });
    }
};

const updateProperty = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        const property_id = req.params.id;
        const propertyById = await properties.findByPk(property_id);

        if (!propertyById) {
            return res.status(404).json({ message: "Property details with this Id not found!!", success: false });
        }

        await properties.update(req.body, {
            where: {
                id: property_id
            }
        }).then(() => {
            return res.status(200).json({ message: "Property Updated Successfully", success: true });
        });

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Unable to update Property details!!", success: false });
    }
};

const deleteProperty = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        const property_id = req.params.id;
        const propertyById = await properties.findByPk(property_id);

        if (!propertyById) {
            return res.status(404).json({ message: "Property details with this Id not found!!", success: false });
        }

        await properties.destroy({
            where: {
                id: property_id
            }
        }).then(() => {
            return res.status(200).json({ message: "Property Deleted Successfully", success: true });
        })
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Unable to delete Property details!!", success: false });
    }
};

const getFilterProperties = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");

        const { filter, value1, value2 } = req.body;
        let propertyByCategory = '';

        if (filter === "unit_type" || filter === "city") {
            propertyByCategory = await properties.findAll({ where: { [filter]: { [Op.like]: `%${value1}%` } } });
        }

        if (filter === "price") {
            propertyByCategory = await properties.findAll({ where: { [filter]: { [Op.between]: [value1, value2] } } });
        }

        if (!propertyByCategory || !propertyByCategory.length) {
            return res.status(404).json({ message: "Properties details not found!!", success: false });
        }
        return res.status(200).json({ message: "All the Properties based on filter retrieved.", success: true, data: propertyByCategory });
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Unable to get Property details!!", success: false });
    }
};



module.exports = { propertyRoot, getAllProperties, getProperty, getMyProperties, createProperty, updateProperty, deleteProperty, getFilterProperties };
