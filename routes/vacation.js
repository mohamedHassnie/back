const express = require("express");
const router = express.Router();
const Vacation = require("../models/Vacation");
const { vacationStatus } = require("../utils/vacation");

router.post("/api/vacation/:id", async (req, res, next) => {
  //TODO: use JWT instead of email
  const { startingDate, endingDate, email } = req.body;

  try {
    const oldVacations = await Vacation.find({ email });
    if (!oldVacations) {
      const newVacation = await Vacation.create({ startingDate, endingDate });
      if (newVacation) res.status(201).json({ newVacation });
      else throw new Error("Vacation could not be created");
    }
  } catch (err) {
    console.log(err);
    next();
  }
});

//   router.put("/api/UpdateEtatAdmin/:id", async (req, res) => {
//     var userId = req.params._id;
//     const newEtat = req.body;
//     try {
//       if (newEtat == 1) {
//         res.status(200).send({ message: "demande réfuser" });
//       } else {
//         const rest = await User.findByIdAndUpdate(newEtat);
//         res.status(200).send({ message: "demande accepter" });
//         console.log(rest);
//       }
//     } catch (err) {
//       res.send("invalid user id").status(409);
//     }
//   });
module.exports = router;
