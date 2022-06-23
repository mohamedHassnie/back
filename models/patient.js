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
  Contact_number: { type: Number },
  Nationality: {
    type: String,
  },

  Date_of_birth: {
    type: Date,
  },
  message: {
    type: String,
  },
});

module.exports = patient = mongoose.model("patient", patient);
