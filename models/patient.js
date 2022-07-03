const mongoose = require("mongoose");
patient = new mongoose.Schema({
  Date: { type: Date, default: Date.now() },

  UserName: {
    type: String,
  },
  LastName: {
    type: String,
  },

  email: { type: String },
  phone: { type: Number },
  Nationality: {
    type: String,
  },
  Type_Analyse: {
    type: String,
  },

  Date_of_birth: {
    type: Date,
  },
  message: {
    type: String,
  },
  location: {
    type: String,
  },
  Gender: { type: String },
});

module.exports = patient = mongoose.model("patient", patient);
