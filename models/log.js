const mongoose = require("mongoose");
log = new mongoose.Schema({
  Date: { type: Date, default: Date.now() },

  path: {
    type: String,
  },
  name: { type: String },
  description: { type: String },
});

module.exports = log = mongoose.model("log", log);
