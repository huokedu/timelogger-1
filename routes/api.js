const functions = require('../utils');
const _ = require('lodash');



/**
 * DB Models;
 */
const Users = require('../models/users');
const Login = require('../models/logins');


module.exports = (express) => {

  const api = express.Router();

  require('./auth')(api, Users, Login, functions, _);
  require('./users')(api, Users, Login, functions, _);

  return api;
}
