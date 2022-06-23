const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const nodemailer = require("nodemailer");
const {
  signupValidator,
  signinValidator,
  validatorResult,
} = require("../middleware/validator");
router.post("/api/signUpPatient", async (req, res) => {
  try {
    const {
      UserName,
      LastName,
      email,
      Contact_number,
      Nationality,
      Date_of_birth,
      message,
    } = req.body;

    const patient = await Patient.findOne({ email });
    if (patient) {
      console.log(patient);
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }
    const newPatient = new Patient({
      UserName,
      LastName,
      email,
      Contact_number,
      Nationality,
      Date_of_birth,
      message,
    });
    await newPatient.save();

    res.json({
      successMessage: "Registration success.",
    });
    // var smtpConfig = {
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true, // use SSL,
    //   // you can try with TLS, but port is then 587
    //   auth: {
    //     patient: "benhessine7@gmail.com",
    //     pass: "clubafricain",
    //   },
    // };

    // var transporter = nodemailer.createTransport(smtpConfig);
    // // replace hardcoded options with data passed (somedata)
    // var mailOptions = {
    //   from: "benhessine7@gmail.com", // sender address
    //   to: newUser.email, // list of receivers
    //   subject: "Hello ,verify your email ✔", // Subject line
    //   text: "this is some text", //, // plaintext body
    //   html: `<h2>${newUser.Name} Thanks for regestring on our site</h2>`, // You can choose to send an HTML body instead
    // };

    // transporter.sendMail(mailOptions, async (err, info) => {
    //   try {
    //     if (err) {
    //       throw err;
    //     } else {
    //       console.log("info :" + info.response);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });
  } catch (err) {
    console.log(" error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
});
router.delete("/api/deletePatient/:_id", async (req, res) => {
  const { _id } = req.params;
  const patient = await Patient.findById(_id);

  if (patient) {
    await patient.deleteOne({ _id });
    res.status(201).json({ msg: "compte supprimer" });
  } else {
    res.status(404).json({ msg: "patient not found" });
  }
});
router.put(
  "/api/updatepatient/:id",
  signupValidator,
  signinValidator,
  validatorResult,
  async (req, res) => {
    var userId = req.params.id.toString();
    const newUser = req.body;
    if (Patient.findOne({ _id: userId })) {
      try {
        const patient = await Patient.findOneAndUpdate(userId, newUser);
        res.send(patient).status(200);
      } catch (err) {
        res.send("invalid patient id").status(409);
      }
    } else {
      res.send("patient not found").status(409);
    }
  }
);
router.get("/api/getPatient", async (req, res) => {
  try {
    const patient = await Patient.find();
    res.send(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get(
  "/api/getPatId/:id",
  (async = (req, res) => {
    Patient.findById({ _id: req.params.id })
      .then((patient) => {
        if (!patient) {
          return res.status(404).json({ message: "Patient not found!" });
        }
        res.status(200).send(patient);
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  })
);
router.get("/api/searchPatient/:key", async (req, res) => {
  let data = await Patient.find({
    $or: [{ UserName: { $regex: req.params.key } }],
  });
  res.send(data);
});
module.exports = router;
