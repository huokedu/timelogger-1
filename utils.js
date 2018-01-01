const secrets = require("./devconfig/secrets");
const bcrypt = require("bcrypt-nodejs");


const verifyPassword = (providedPassword, encryptPassword) => {
 
  /**
   * Verifys a password provided with the hash of the password
   * stored using bcrypt-nodejs;
   * Returns a `true` or `false`;
   */
  return bcrypt.compareSync(providedPassword, encryptPassword);
};

const encryptPassword = (providedPassword) => {
  /**
   * Encrypts a provided password using bcrypt-nodejs;
   * Returns a hash;
   */
  let salt = bcrypt.genSaltSync(10);
  let encrypted = bcrypt.hashSync(providedPassword, salt);
  return encrypted;
};

/**
 * This is the JWT Signature tree;
 */
const encryptPayload = (payload) => {
  return JWT.sign({
      data: payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      iat: Math.floor(new Date(Date.now()))
    },
    secrets.JWT_SECRET
  );
};

const requestAuthorization = (req, res, next) => {
  let bearerToken;
  let bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    JWT.verify(bearerToken, secrets.JWT_SECRET, (err, verified) => {
      if (err) {
        if (err.message === "JWT expired") {
          return res.sendStatus(403);
        } else if (err.message === "invalid signature") {
          console.log(err.message, "Err message");
          return res.status(403).redirect('/login');
        }
      }
      if (verified) {
        return next();
      }
    });
  } else {
    return res.sendStatus(403);
  }
};

const arrayObjectIndexOf = (myArray, searchTerm, property) => {
  for (var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
};

const generateId = (length) => {
  let result = '';
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
};

module.exports = {
  // sendSMS,
  // sendEmail,
  generateId,
  encryptPayload,
  verifyPassword,
  encryptPassword,
  arrayObjectIndexOf,
  requestAuthorization,
 
};