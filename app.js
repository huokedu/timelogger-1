const express = require('express');
const app = express();
const router = express.Router();
const server = require('http').Server(app);
const database = require('./devconfig/database');

database.Connect();

require('./configs')(app, express);

module.exports = {
    app: app,
    server: server
};