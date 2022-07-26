const mongoose = require("mongoose");
entretient = new mongoose.Schema({
  interview: { type: String, required: false },
  interv: [
    { UserName: { type: String, required: false } },
    { email: { type: String, required: false } },
  ],
  date_entretient: { type: String, required: false },
  type: { type: String, required: false },
  status: { type: String, required: false },
});

module.exports = entretient = mongoose.model("entretient", entretient);
