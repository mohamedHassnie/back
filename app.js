const express = require("express");
const app = express();
const upload = require("express-fileupload");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("./config/database");
const patient = require("./routes/PatientControllers");
const vacation = require("./routes/vacation");
const analyseRoutes = require("./routes/analyse");
const crudUser = require("./routes/User");
const pingRoutes = require("./routes/ping");
const condidat = require("./routes/condidat");
const entretient = require("./routes/entretient");
const auth_User = require("./routes/auth_User");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
flash = require("express-flash");
const socketIo = require("socket.io");
require("dotenv").config({ path: "config.env" }); //=> Problem ..............

const PORT = 3011;
console.log(PORT);
const multer = require("multer");
const path = require("path");
const server = require("http").createServer(app);
const io = socketIo(server);
io.on("connection", (socket) => {
  console.log("new user connected");
});
//stocker information dans bd a travers un id et dans le cookies ( navigateur)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images");
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}
const uploadImage = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// POST File
app.post("/api/upload", uploadImage.single("userImage"), (req, res) => {
  console.log("Upload", req.file.location);
  if (req.file.location) {
    return res.status(200).json({ message: "Image Uploaded With Success" });
  }
  res.status(200).json({ message: "Image Uploaded With Success" });
  res.send(req.file.location);
});

//Login Google

const client = new OAuth2Client(
  "383609296631-1rqh8hldbf76j1420idr4l0bhhab1lhr.apps.googleusercontent.co"
);

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}
app.post("api/google-login", (req, res) => {
  const { token } = req.body;

  const ticket = client.verifyIdToken({
    idToken: token,
    audience:
      "383609296631-1rqh8hldbf76j1420idr4l0bhhab1lhr.apps.googleusercontent.co",
  });

  const { name, email, picture, sub } = ticket.getPayload();

  upsert(users, { name, email, picture });

  let Usertoken = jwt.sign(
    { _id: sub, email: email },
    "ParkingReactApXXX2020",
    {
      expiresIn: "24h",
    }
  );
  res.status(201);
  res.json({ name, email, photo: picture, token: Usertoken, _id: sub });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload({ limit: "5mb" }));
app.use(
  morgan(
    ":date[web] :remote-user IP :remote-addr Method :method URL :url Status:status - :response-time ms Agent :user-agent"
  )
);

app.use(analyseRoutes);
app.use(pingRoutes);
app.use(crudUser);
app.use(patient);
app.use(vacation);
app.use(condidat);
app.use(entretient);
app.use(auth_User);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { status: err.status || 500, message: err.message } });
});

app.listen(PORT, () => console.log("Running on Port " + PORT));
