// Author: Anuj Dev (B00900887)

const { HOST, USER, PASSWORD, DB } = require("../config");

module.exports = {
  HOST,
  USER,
  PASSWORD,
  DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
