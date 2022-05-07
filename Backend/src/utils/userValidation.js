// Author: Anuj Dev (B00900887)

const { body, validationResult, param } = require("express-validator");

const registrationValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("Full Name is required")
      .isLength({ min: 2, max: 20 })
      .withMessage("First name should be between 2 and 20 characters"),
    body("lastName")
      .notEmpty()
      .withMessage("Full Name is required")
      .isLength({ min: 2, max: 20 })
      .withMessage("Last name should be between 2 and 20 characters"),
    body("email").notEmpty().withMessage("Email is required").isEmail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      )
      .withMessage(
        "Password must contain at least 1 lowercase, 1 uppercase, 1 special characters and numbers"
      ),
    body("confirmPassword")
      .notEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Confirm Password does not match password");
        }
        return true;
      }),
  ];
};
const changePasswordValidationRules = () => {
  return [
    body("oldPassword")
      .notEmpty()
      .withMessage("Old Password is Required Field")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      )
      .withMessage(
        "Password must contain at least 1 lowercase, 1 uppercase, 1 special characters and numbers"
      ),
    body("newPassword")
      .notEmpty()
      .withMessage("New Password is required Filed")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      )
      .withMessage(
        "Password must contain at least 1 lowercase, 1 uppercase, 1 special characters and numbers"
      ),
    body("confirmNewPassword")
      .notEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Confirm New Password does not match password");
        }
        return true;
      }),
  ];
};
const updateProfileValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("Full Name is required")
      .isLength({ min: 2, max: 20 })
      .withMessage("First name should be between 2 and 20 characters"),
    body("lastName")
      .notEmpty()
      .withMessage("Full Name is required")
      .isLength({ min: 2, max: 20 })
      .withMessage("Last name should be between 2 and 20 characters"),
  ];
};
const forgetPasswordValidationRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Must be a valid email address"),
  ];
};

const resetPasswordValidationRules = () => {
  return [
    body("newPassword")
      .notEmpty()
      .withMessage("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
      )
      .withMessage(
        "Password must contain combination of at least 1 lowercase, 1 uppercase, 1 special characters and numbers"
      ),
    body("confirmNewPassword")
      .notEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
  ];
};
const loginValidationRules = () => {
  return [
    body("email").notEmpty().withMessage("Email is required").isEmail(),
    body("password").notEmpty().withMessage("Password field is required"),
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
  registrationValidationRules,
  loginValidationRules,
  changePasswordValidationRules,
  updateProfileValidationRules,
  forgetPasswordValidationRules,
  resetPasswordValidationRules,
  validateRequest,
};
