const mongoose = require("mongoose");

adminSchema = mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },

  userImage: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
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
});

module.exports = Admin = mongoose.model("User", adminSchema);
