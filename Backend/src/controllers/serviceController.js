// Author: Pankti Vyas (B00886309)

const { services } = require("../models");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

const serviceRoot = (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        res
            .status(200)
            .json({ message: "Welcome to service Module", success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};

const getAllServices = async (req, res) => {
    try {
        const listOfServices = await services.findAll();
        res.setHeader("Content_type", "application/json");
        res.status(200).json(listOfServices);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const addService = async (req, res) => {
    try {
        const s = req.body;
        await services.create(s).then(() => {
            res.status(200).json(s);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false });
    }
}

const editService = async (req, res) => {
    try {
        const id = req.params.id;
        const s = await services.findByPk(id);

        const isFileNameChanged = s.image !== req.body.image;
        const previousFileName = s.image;

        await s.update(req.body);
        await s.save();

        if (isFileNameChanged) {
            deleteImageAssociatedWithService(previousFileName);
        }
        res.status(200).json(s);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const getService = async (req, res) => {
    try {
        const id = req.params.id;
        const s = await services.findByPk(id);
        res.status(200).json(s);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const deleteImageAssociatedWithService = (imageName) => {
    const imagePath = path.join("images", imageName);
    try {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteService = async (req, res) => {
    try {
        const id = req.params.id;
        const s = await services.findByPk(id);
        deleteImageAssociatedWithService(s.image);

        await services.destroy({
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

const getMyServices = async (req, res) => {
    try {
        res.setHeader("Content_type", "application/json");
        const userId = req.params.id;
        console.log(userId);
        const userServices = await services.findAll({ where: { userid: userId } });
        if (!userServices || !userServices.length) {
            return res.status(404).json({ message: "Services details not found!!", success: false });
        }
        return res.status(200).json(userServices);

    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Unable to get service details from Id!!", success: false });
    }
};

const filterServices = async (req, res) => {
    try {
        const filters = req.body;
        const locationFilter = filters.location;
        const titleFilter = filters.title;
        const priceFilter = filters.price;
        const userFilter = filters.userId;

        const filtersToUse = {};

        if (locationFilter) {
            filtersToUse.location = { [Op.like]: `%${locationFilter}%` };
        }

        if (titleFilter) {
            filtersToUse.title = { [Op.like]: `%${titleFilter}%` };
        }

        if (priceFilter && !isNaN(priceFilter.min) && !isNaN(priceFilter.max)) {
            filtersToUse.price = { [Op.between]: [priceFilter.min, priceFilter.max]};
        } else if (priceFilter && !isNaN(priceFilter.min)) {
            filtersToUse.price = { [Op.gte]: priceFilter.min };
        } else if  (priceFilter && !isNaN(priceFilter.max)) {
            filtersToUse.price  = { [Op.lte]: priceFilter.max };
        }

        if (userFilter) {
            filtersToUse.userid = { [Op.eq]: userFilter };
        }

        const filteredServices = await services.findAll({ where: filtersToUse });


        if (filteredServices !== undefined) {
            return res.status(200).send(filteredServices);
        }
        
        throw new Error("Error while fetching services.");
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Unable to get services.",
            success: false
        });
    }
}

module.exports = {
    serviceRoot,
    getAllServices,
    addService,
    editService,
    getService,
    deleteService,
    getMyServices,
    filterServices
};
