var mongoose = require('mongoose');
loginAttempts = mongoose.Schema({
  email: {
    type: String
  },
  dateLoggedIn: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('logins', loginAttempts);
