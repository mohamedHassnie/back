const mongoose = require("mongoose");
Vacation = new mongoose.Schema({
  userId: { type: String },
  startingDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  maxDays: { type: Number, default: 25 },
  status: { type: String },
});

module.exports = Vacation = mongoose.model("Vacation", Vacation);
