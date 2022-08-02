const mongoose = require("mongoose");

AnalyseGenetique = new mongoose.Schema({
  UserId: { type: String },
  ID_chrom: {
    type: String,
  },
  POS: {
    type: String,
  },

  GénoType: {
    type: String,
  },
  categorie: {
    type: String,
  },

  //createdAt: { type: Date, expires: 60, default: Date.now },
});
module.exports = AnalyseGenetique = mongoose.model(
  "Base-nucleotide",
  AnalyseGenetique
);
