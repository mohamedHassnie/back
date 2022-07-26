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

router.post("/api/addUser", auth.verifyToken, async (req, res) => {
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
  let ip = address.ip();

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
      ip,
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

router.put("/api/updatepass/:id", auth.verifyToken, async (req, res) => {
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

router.post("/api/request/password", auth.verifyToken, async (req, res) => {
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

router.put("/api/UpdateUser", async (req, res) => {
  let token = req.headers.authorization;
  const decoded = jwt.verify(token, SECRET_KEY);
  console.log("fff", decoded.id);
  var userId = decoded.id;
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

router.delete("/api/deleteUser/:_id", auth.verifyToken, async (req, res) => {
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

router.get("/api/getUser", auth.verifyToken, async (req, res) => {
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
  auth.verifyToken,
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
router.get("/api/logout/:id", auth.verifyToken, (req, res) => {
  //id ne5thouh min route
  // body : req.body yetsamao query
  //params: f path
  //?name=mohamed & query tetb3ath f path mtee url
  User.findByIdAndUpdate(req.params.id, {
    status: "inactive",
  });
});

router.get("/api/search/:key", auth.verifyToken, async (req, res) => {
  let data = await User.find({
    $or: [{ UserName: { $regex: req.params.key } }],
  });
  res.send(data);
});

router.post("/api/loginGoogle", auth.verifyToken, (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = User.findOne({ email: req.body.email });
  if (!user) res.status(400).send({ message: "Email Not found !" });
  else {
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.json({
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
  }
});

module.exports = router;
