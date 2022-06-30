const mongoose = require("mongoose");

UserSchema = mongoose.Schema({
  UserName: {
    type: String,
    required: false,
  },
  LastName: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: true,
  },
  phone: {
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
  emailToken: { type: String },
  isVerified: { type: Boolean },
});

module.exports = UserSchema = mongoose.model("Users", UserSchema);
