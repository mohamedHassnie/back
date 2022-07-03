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
    status,
    userImage,
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
      userImage,
      status,
    });
    await newUser.save();
    res.status(200).json({
      successMessage: `Compte ` + newUser.UserName + `Your work has been saved`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
});

router.post("/api/password/:id/:token", async (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const doesExist = await User.findById(id);
  const passwordMatch = await bcrypt.compare(
    req.body.oldpass,
    doesExist.password
  );

  if (!passwordMatch) {
    res.status(400).send({ message: "Password incorrect" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let pass = hashedPassword;

    User.findByIdAndUpdate(id, { password: pass }, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "Cannot update user with ${id}/Maybe user not found!",
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status.send({ message: "Error update user information" });
      });
  }
});
router.post("api/updatepass/:id", async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const doesExist = await User.findOne({ email: req.body.email });
  if (!doesExist) res.status(400).send({ message: "Email Not found !" });
  else {
    res.json({
      _id: doesExist._id,
      token: jwt.sign(
        { _id: doesExist._id, email: doesExist.email },
        "ParkingAppXXX",
        {
          expiresIn: "24h",
        }
      ),
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
router.get("/api/logout/:id", (req, res) => {
  //id ne5thouh min route
  // body : req.body yetsamao query
  //params: f path
  //?name=mohamed & query tetb3ath f path mtee url
  User.findByIdAndUpdate(req.params.id, {
    status: "inactive",
  });
});

router.get("/api/search/:key", async (req, res) => {
  let data = await User.find({
    $or: [{ UserName: { $regex: req.params.key } }],
  });
  res.send(data);
});

module.exports = router;
