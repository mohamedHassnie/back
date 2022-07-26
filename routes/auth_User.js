const express = require("express");
const User = require("../models/Administration");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const router = express.Router();
const SECRET_KEY = "AZyWmZ1456@TOOP";
// const SECRET_KEY = process.env.SECRET_KEY;
const auth = require("../middleware/auth");
var address = require("address");
router.post("/api/login", async (req, res, next) => {
  const { email, password } = req.body;
  let ip = address.ip();
  console.log(ip);
  if (!(email && password && ip)) {
    res.status(400).send("All input is required");
  }
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      bcrypt
        .compare(password, user.password)
        .then(async (match) => {
          if (!match) throw new createError(403, "Password is not correct");
          const token = jwt.sign(
            {
              id: user.id,
              role: user.role,
              ip: user.ip,
            },
            SECRET_KEY,

            {
              expiresIn: "180d",
            }
          );
          User.findByIdAndUpdate(user._id, {
            status: "active",
          });
          return res.status(200).json({
            message: "Welcome " + user.UserName,
            token,
            user: {
              id: user._id,
              UserName: user.UserName,
              LastName: user.LastName,
              email: user.email,
              role: user.role,
              phone: user.phone,
              location: user.location,
              userImage: user.userImage,
              status: user.status,
            },
          });
        })
        .catch((error) => {
          console.error(error);
          next(error);
          res.status().json({ message: "Connexion réfuser " + user.UserName });
        });
    } else {
      throw new createError(404, "Email not found");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.post("/api/hash", auth.verifyToken, async (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const hash = bcrypt.hashSync(password, salt);
    res.status(201).json({ hash });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
