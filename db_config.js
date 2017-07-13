var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var connection = mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
});

connection.then( db => {
  console.log("successful DB connection")
})
.catch( error => {
  console.log("there was an error: ", error);
  throw(error);
});
