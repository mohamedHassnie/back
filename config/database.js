const mongoose = require("mongoose");
//const MONGO_URL = 'mongodb://mongo_app/medicale
//mongodb://localhost:27017/PlateformeMedicale
const MONGO_URL = "mongodb://localhost:27017/PlateformeMedicale";
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("database connected succefully"))
      .catch((e) => {
        console.log("unable to connect to the datbase , error :", e);
      });
  }
}
module.exports = new Database();
