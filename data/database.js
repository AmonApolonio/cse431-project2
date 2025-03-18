const  dotnev = require('dotenv');
dotnev.config();

const MongoClient = require('mongodb').MongoClient;
let _db;

const initDb = (callback) => {
  if (_db) {
    console.warn('Db is already initialized');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
}

const getDatabase = () => {
  if (!_db) {
    throw new Error('Db has not been initialized');
  }
  return _db;
}

module.exports = {
  initDb,
  getDatabase,
};