// Author: Anuj Dev (B00900887)

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  HOST: process.env.DEV_HOST,
  USER: process.env.DEV_USER,
  PASSWORD: process.env.DEV_PASSWORD,
  DB: process.env.DEV_DB,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_VALUE: process.env.SALT_VALUE,
  MAIL_API_KEY: process.env.MAIL_API_KEY,
  WEBSITE_LINK: process.env.WEBSITE_LINK,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
};
