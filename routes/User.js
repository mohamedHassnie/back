const express = require("express");
const User = require("../models/Administration");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const router = express.Router();
// const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "AZyWmZ1456@TOOP";

router.post("/api/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  try {
    const user = await User.findOne({ email: email });
    console.log("eeee", user);
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then(async (match) => {
          if (!match) throw new createError(403, "Password is not correct");
          const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET_KEY,
            {
              expiresIn: "24h",
            }
          );
          return res.status(200).json({
            message: "Welcome " + user.UserName,
            token,
            user: {
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
        });
    } else {
      throw new createError(404, "Email not found");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/api/hash", async (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    const hash = bcrypt.hashSync(password, salt);
    res.status(201).json({ hash });
  } catch (error) {
    next(error);
  }
});

router.post("/api/addUser", async (req, res) => {
  const {
    UserName,
    LastName,
    phone,
    email,
    password,
    role,
    location,
    //status,
    //userImage,
  } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(404)
        .json({ message: `le compte de ${UserName} déja existe ` });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      UserName,
      LastName,
      phone,
      email,
      password: hash,
      role,
      location,
      // userImage,
      // status,
    });
    await newUser.save();
    res.status(200).json({
      successMessage: "Registration success. Please signin.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
});

router.put("/api/UpdateUser/:_id", async (req, res) => {
  var userId = req.params._id;
  const newUser = req.body;
  if (User.findOne({ _id: userId }).select("-password")) {
    try {
      const markiting = await User.findByIdAndUpdate(userId, newUser);
      res.send(markiting).status(200);
    } catch (err) {
      res.send("invalid user id").status(409);
    }
  } else {
    res.send("user not found").status(409);
  }
});

router.delete("/api/deleteUser/:_id", async (req, res) => {
  const { _id } = req.params;
  const newUser = await User.findById(_id);
  `Compte de  ${newUser} supprimé`;
  if (newUser) {
    await newUser.deleteOne({ _id });
    res.status(201).json({ msg: "compte  supprimer" });
  } else {
    res.status(404).json({ msg: "user not found" });
  }
});

router.get("/api/getUser", async (req, res) => {
  try {
    const results = await User.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/api/getUserByRole", async (req, res) => {
  try {
    if (req.body.role !== "ALL") {
      const results = await User.find({ role: req.body.role });
      res.status(200).send(results);
    }
    const results = await User.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get(
  "/api/getUserById/:id",
  (async = (req, res) => {
    User.findById({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Patient not found!" });
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  })
);
router.get("/api/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("login");
});

router.get("/api/search/:key", async (req, res) => {
  let data = await User.find({
    $or: [{ UserName: { $regex: req.params.key } }],
  });
  res.send(data);
});
module.exports = router;
