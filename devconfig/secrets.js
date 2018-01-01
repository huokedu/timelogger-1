require('dotenv').load();
let MONGO_DB;
if( process.env.NODE_ENV !== 'production'){
    MONGO_DB = process.env.MONGO_DB_DEV;
};

module.exports = {
    DATABASE: MONGO_DB,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    JWT_SECRET: process.env.JWT_SECRET,
    SMS_URL: process.env.SMS_URL,
    TRANSPORTER_USER: process.env.TRANSPORTER_USER,
    TRANSPORTER_PASS: process.env.TRANSPORTER_PASS,
};