const express = require("express");
const router = express.Router();
const stagaire = require("../models/stagaire");

router.post("/api/addStagaire", async (req, res, next) => {
  const {
    UserName,
    LastName,
    phone,
    password,
    userImage,
    status,
    role,
    location,
    startingDate,
    endingDate,
    message,
    specialiter,
    encadreur,
    etablissement,
    contrat,
  } = req.body;
  try {
    //  email = interv.email;
    const stagaire = await stagaire.findOne({ UserName });
    if (!stagaire) {
      res.send({ msg: " user Not Found" });
    } else {
      const newstagaire = new stagaire({
        UserName,
        LastName,
        phone,
        password,
        userImage,
        status,
        role,
        location,
        startingDate,
        endingDate,
        message,
        specialiter,
        encadreur,
        etablissement,
        contrat,
      });
      await newstagaire.save();
      console.log(new Date().getFullYear());
    }
  } catch (err) {
    next(err);
  }
});

router.get("api/getEntretient", async (req, res, next) => {
  try {
    const results = await stagaire.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("api/delete/:id ", async (req, res, next) => {
  const { _id } = req.params;
  try {
    const newstagaire = await stagaire.findById(_id);
    if (newstagaire) {
      await newstagaire.deleteOne({ _id });
      res.status(201).json({ msg: "compte  supprimer" });
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (error) {
    next(error);
  }
});
router.put("/api/UpdateStagaire/:id", async (req, res) => {
  const newEntretient = req.body;
  const userId = req.params.id;
  if (stagaire.findOne({ _id: userId }).select("-password")) {
    try {
      const stagaire = await stagaire.findByIdAndUpdate(userId, newEntretient);
      res.send(stagaire).status(200);
    } catch (err) {
      res.send("invalid user id").status(409);
    }
  } else {
    res.send("user not found").status(409);
  }
});
module.exports = router;
