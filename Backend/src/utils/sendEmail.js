// Author: Anuj Dev (B00900887)

const sendgrid = require("@sendgrid/mail");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { MAIL_API_KEY } = require("../config");
const { FROM_EMAIL_ID } = require("../config/constants");

sendgrid.setApiKey(MAIL_API_KEY);

const sendEmail = async (email, subject, payload, template) => {
  try {
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const response = await sendgrid.send({
      to: email,
      from: FROM_EMAIL_ID,
      subject,
      html: compiledTemplate(payload),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmail,
};
