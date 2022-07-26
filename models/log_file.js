const mongoose = require("mongoose");
log = new mongoose.Schema({
  Date: { type: Date, default: new Date() },

  pathCsv: {
    type: String,
  },
  pathVcf: {
    type: String,
  },
  name: { type: String },
  description: { type: String },
});

module.exports = log = mongoose.model("log_file", log);
