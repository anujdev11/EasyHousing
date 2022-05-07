// Author: Anuj Dev (B00900887)

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    firstName: {
      type: Sequelize.STRING,
      required: true,
    },
    lastName: {
      type: Sequelize.STRING,
      required: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
    imgURL: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      default: "app_user",
    },
  });
  return Users;
};
