const mongoose = require("mongoose");

UserSchema = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  Contact_number: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },

  userImage: {
    type: String,
    required: false,
  },

  status: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  location: { type: String },
});

module.exports = UserSchema = mongoose.model("UserSchema", UserSchema);
