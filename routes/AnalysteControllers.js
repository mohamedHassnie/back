// const express = require("express");
// const router = express.Router();
// var Analyste = require("../models/Analyste");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const upload = require("../config/Telechargement");
// router.post("/inscritAnalyste", upload.single("image"), async (req, res) => {
//   const { UserName, LastName, email, phone, password } = req.body;
//   const { image } = req.file;
//   console.log(image);
//   try {
//     const analyste = await Analyste.findOne({ password });
//     if (analyste) {
//       res
//         .status(404)
//         .json({ message: `le compte de ${UserName} déja existe ` });
//     }
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     res.status(201).json({ hash });
//     const newAnalyste = new Analyste({
//       UserName,
//       LastName,
//       email,
//       phone,
//       password: hash,
//       userImage,
//       image,
//     });
//     await newAnalyste.save();
//     res.json({
//       successMessage: "Registration success. Please signin.",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       errorMessage: "Server error",
//     });
//   }
// });
// router.post("/loginAnalyste", async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const newAnalyste = await Analyste.findOne({ email });
//     if (newAnalyste) {
//       bcrypt
//         .compare(password, admin.password)
//         .then(async (match) => {
//           if (!match) throw new createError(403, "Password is not correct");
//           const token = jwt.sign(
//             { id: newAnalyste.id, email: newAnalyste.email },
//             SECRET_KEY,
//             {
//               expiresIn: "2h",
//             }
//           );
//           return res.status(200).json({ message: "Welcome Admin!", token });
//         })
//         .catch((error) => {
//           console.error(error);
//           next(error);
//         });
//     } else {
//       throw new createError(404, "Email not found");
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// });
// router.delete("/deleteAnalyste/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const newAnalyste = await Analyste.findById(_id);
//   `Compte de  ${newAnalyste} supprimé`;
//   if (newAnalyste) {
//     await newAnalyste.deleteOne({ _id });
//     res.status(201).json({ msg: "compte  supprimer" });
//   } else {
//     res.status(404).json({ msg: "user not found" });
//   }
// });
// router.put(
//   "/UpdateAnalyste/:id",
//   /*signupValidator,
//   signinValidator,
//   validatorResult,*/
//   async (req, res) => {
//     var analysteId = req.params.id.toString();
//     const newAnalyste = req.body;
//     if (Analyste.findOne({ _id: analysteId })) {
//       try {
//         const analyste = await Analyste.findOneAndUpdate(
//           analysteId,
//           newAnalyste
//         );
//         res.send(analyste).status(200);
//       } catch (err) {
//         res.send("invalid user id").status(409);
//       }
//     } else {
//       res.send("user not found").status(409);
//     }
//   }
// );
// router.get("/getAnalyste", async (req, res) => {
//   try {
//     const results = await Analyste.find();
//     res.send(results);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// module.exports = router;
