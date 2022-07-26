const mongoose = require("mongoose");
stagaire = mongoose.Schema({
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
  startingDate: { type: String, required: false },
  endingDate: { type: String, required: false },
  message: { type: String, required: false },
  specialiter: { type: String, required: false },
  encadreur: { type: String, required: false },
  etablissement: { type: String, required: false },
  contrat: [
    {
      type: { type: String, required: false },

      duree: { type: String, required: false },
    },
  ],
});

module.exports = stagaire = mongoose.model("stagaire", stagaire);
