const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { get } = require("mongoose");
const entretient = require("../models/entretient");
const Vacation = require("../models/Vacation");
const SECRET_KEY = "AZyWmZ1456@TOOP";

router.post("/api/addEntretient", async (req, res, next) => {
  const { interview, interv, date_entretient, type } = req.body;
  try {
    email = interv.email;
    const user = await entretient.findOne({ email });
    if (!user) {
      res.send({ msg: " user Not Found" });
    } else {
      const newentretient = new entretient({
        interview,
        interv,
        date_entretient,
        type,

        status: "attente",
      });
      await newentretient.save();
    }
  } catch (err) {
    next(err);
  }
});

router.get("api/getEntretient", async (req, res, next) => {
  try {
    const results = await entretient.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("api/delete/:id ", async (req, res, next) => {
  const { _id } = req.params;
  try {
    const newentretient = await entretient.findById(_id);
    if (newentretient) {
      await newentretient.deleteOne({ _id });
      res.status(201).json({ msg: "compte  supprimer" });
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (error) {
    next(error);
  }
});
router.put("/api/updateEntretien/:id", async function (req, res) {
  const userId = req.params.id;
  const { newUser } = req.body;
  if (entretient.findOne({ _id: userId }).select("-password")) {
    try {
      const entretient = await entretient.findByIdAndUpdate(userId, newUser);
      res.send(entretient).status(200);
    } catch (err) {
      res.send("invalid user id").status(409);
    }
  } else {
    res.send("user not found").status(409);
  }
});

module.exports = router;
