const mongoose = require("mongoose");
Vacation = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  startingDate: { type: String, required: false },
  endingDate: { type: String, required: false },
  type_vacation: { type: String, required: false },
  message: { type: String, required: false },
  maxDays: { type: Number, default: 15 },
  maxDaysMalade: { type: Number, default: 12 },
  days: { type: Number },
  status: { type: String, default: "pending" },
});

module.exports = Vacation = mongoose.model("Vacation", Vacation);
