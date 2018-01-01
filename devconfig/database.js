var mongoose = require('mongoose'),
secrets = require('./secrets'),
databaseConnect = mongoose.connection;

mongoose.connect(secrets.DATABASE, {
useMongoClient: true
});
module.exports = {

Connect: function () {
  databaseConnect.on('error', console.error.bind(console, 'MongoDb Connection Error. Please make sure that MongoDb is running.'));
  databaseConnect.once('open', function callback() {
    console.log('Connection to Techverse DB Open');
  });
}
};
