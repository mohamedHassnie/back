// const express = require("express");
// const router = express.Router();
// var Markiting = require("../models/Markiting");
// const { ensureAuthenticated } = require("../config/auth");

// const bcrypt = require("bcryptjs");

// const {
//   signupValidator,
//   signinValidator,
//   validatorResult,
// } = require("../middleware/validator");

// router.post("/inscritMarkiting", async (req, res) => {
//   try {
//     const { UserName, LastName, email, phone, password } = req.body;
//     const markiting = await Markiting.findOne({ email });
//     if (markiting) {
//       res
//         .status(404)
//         .json({ message: `le compte de ${UserName} déja existe ` });
//     } else {
//       const salt = bcrypt.genSaltSync(10);
//       const hash = bcrypt.hashSync(password, salt);
//       res.status(201).json({ hash });
//       const newMark = new Markiting({
//         UserName,
//         LastName,
//         email,
//         phone,
//         password: hash,
//       });
//       await newMark.save();
//       res.json({
//         successMessage: "Registration success. Please signin.",
//       });
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       errorMessage: "Server error",
//     });
//   }
// });

// router.post("/loginMarkiting", ensureAuthenticated, (req, res) =>
//   passport.authenticate("local", {
//     successRedirect: "/dashboard",
//     failureRedirect: "/users/login",
//     //failureFlash: true,
//   })(req, res, next)
// );

// router.delete("/deleteMarkiting/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const markiting = await Markiting.findById(_id);
//   `Compte de  ${markiting} supprimé`;
//   if (markiting) {
//     await markiting.deleteOne({ _id });
//     res.status(201).json({ msg: "compte  supprimer" });
//   } else {
//     res.status(404).json({ msg: "user not found" });
//   }
// });

// router.put(
//   "/UpdateMarkiting/:id",
//   signupValidator,
//   signinValidator,
//   validatorResult,
//   async (req, res) => {
//     var markitingId = req.params.id.toString();
//     const newMarkiting = req.body;
//     if (Patient.findOne({ _id: markitingId })) {
//       try {
//         const markiting = await Patient.findOneAndUpdate(
//           markitingId,
//           newMarkiting
//         );
//         res.send(markiting).status(200);
//       } catch (err) {
//         res.send("invalid user id").status(409);
//       }
//     } else {
//       res.send("user not found").status(409);
//     }
//   }
// );
// router.get("/getMarkiting", async (req, res) => {
//   try {
//     const results = await Markiting.find();
//     res.send(results);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// router.get(
//   "/getMarkitingId/:id",
//   (async = (req, res) => {
//     Markiting.findById({ _id: req.params.id })
//       .then((mark) => {
//         if (!mark) {
//           return res.status(404).json({ message: "markiting not found!" });
//         }
//         res.status(200).send(mark);
//       })
//       .catch((err) => {
//         res.status(404).json({ message: err });
//       });
//   })
// );
// router.get("/logout", (req, res) => {
//   req.logout();
//   req.flash("success_msg", "You are logged out");
//   res.redirect("login");
// });
// module.exports = router;
