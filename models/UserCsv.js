const mongoose = require("mongoose");
UserCsv = new mongoose.Schema({
  Date: { type: Date, default: Date.now() },
  email: { type: String },
  Barcode: { type: String },
  Product_selection: { type: String },
  UserCsvName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  status: {
    type: String,
  },
  ID_Passport: {
    type: String,
  },
  Nationality: {
    type: String,
  },
  Gender: {
    type: String,
  },
  Date_of_birth: {
    type: Date,
  },
  Contact_number: { type: Number },
  Physical_Address: { type: String },

  Medical_Questions: [
    {
      Country_of_Origin: {
        type: String,
      },
      Do_you_drink_Alcohol: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
      Have_you_ever_smoked: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
      Do_you_currently_smoke: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
    },
  ],
  Family_medical_history: [
    {
      Hypertension: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },

      Diabetes_TypeI: {
        Breast_cancer: {
          You: { type: String },
          Father: { type: String },
          MOther: { type: String },
        },
      },
      Diabetes_TypeII: {
        Breast_cancer: {
          You: { type: String },
          Father: { type: String },
          MOther: { type: String },
        },
      },
      Heart_disease: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
      Cholesterol: {
        You: { type: String },
        Father: { type: String },
        MOther: { type: String },
      },
    },
  ],
  Family_Cancer_History: [
    {
      Breast_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Colon_rectal_colorectal_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Female_reproductive_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Liver_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Lung_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },

      Pancreatic_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Prostate_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },

      Skin_cancer: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
    },
  ],
  Reproductive_history: [
    {
      Polycystic_ovarian_syndrome: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },

      Endometriosis: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Problems_falling_pregnant: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Past_miscarriages: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Currently_pregnant: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Menopausal: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
      Post_menopausal: {
        You: { type: String },
        MOther: { type: String },
        Father: { type: String },
        Child: { type: String },
      },
    },
  ],
  Category1: [
    {
      a1: { type: String },
      b1: { type: String },
      c1: { type: String },
      d1: { type: String },
    },
  ],
  Category2: [
    {
      a2: { type: String },
      b2: { type: String },
      c2: { type: String },
      d2: { type: String },
    },
  ],
  Category3: [
    {
      a3: { type: String },
      b3: { type: String },
      c3: { type: String },
      d3: { type: String },
    },
  ],
  Category4: [
    {
      a4: { type: String },
      b4: { type: String },
      c4: { type: String },
      d4: { type: String },
    },
  ],
});

module.exports = UserCsv = mongoose.model("UserCsv", UserCsv);
