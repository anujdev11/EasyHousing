// Author: Purvilkumar Bharthania (B00901605)

const { body, validationResult, param } = require("express-validator");

const propertyValidationRules = () => {
    return [
        body("title")
            .notEmpty()
            .withMessage("Title is required")
            .isLength({ min: 8, max: 60 })
            .withMessage("Title should be between 8 and 60 characters"),
        body("bedrooms")
            .notEmpty()
            .withMessage("Bedroooms are required"),
        body("bathrooms")
            .notEmpty()
            .withMessage("Bathroooms are required"),
        body("unit_type")
            .notEmpty()
            .withMessage("Unit type is required"),
        body("furnished")
            .notEmpty()
            .withMessage("Furinshed information is required")
            .isBoolean()
            .withMessage("Enter boolean value"),
        body("sq_feet")
            .notEmpty()
            .withMessage("Square feet information is required")
            .isInt({ min: 1, max: 10000 })
            .withMessage("Enter between 1 to 10000"),
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Correct Email is required"),
        body("phone_no")
            .notEmpty()
            .withMessage("Phone number is required"),
        body("user_id")
            .notEmpty()
            .withMessage("User is required").isInt().withMessage("Valid User required"),
        body("price")
            .notEmpty()
            .withMessage("Price information is required")
            .isInt({ min: 1, max: 10000 })
            .withMessage("Enter between 1 to 10000"),
    ];
};

const filterValidationRules = () => {
    return [
        body("filter")
            .notEmpty()
            .withMessage("Filter category is required")
            .isIn(['unit_type', 'city', 'price'])
            .withMessage("Correct Filter Category is required"),
    ];
};
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    propertyValidationRules,
    filterValidationRules,
    validateRequest,
};
