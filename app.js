const express = require("express");
const app = express();
const upload = require("express-fileupload");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("./config/database");
AnalyseGenetique = require("./models/BaseNucleotide");
patient = require("./routes/PatientControllers");
Markiting = require("./routes/markitingRouter");
stat = require("./routes/AnalysteControllers");
const analyseRoutes = require("./routes/analyse");
const authAmin = require("./routes/User");
const pingRoutes = require("./routes/ping");

flash = require("express-flash");

require("dotenv").config({ path: "config.env" }); //=> Problem ..............

const PORT = process.env.PORT || 6000; //port devient 3010
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
// stocker information dans bd a travers un id et dans le cookies ( navigateur)

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "images");
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}_${Date.now()}`);
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
app.post("/api/upload", uploadImage.single("image"), (req, res) => {
  console.log("Upload", req.file.location);
  if (req.file.location) {
    return res.status(200).json({ message: "Image Uploaded With Success" });
  }
  res.status(200).json({ message: "Image Uploaded With Success" });
  res.send(req.file.location);
});

app.use(cors());
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
app.use(authAmin);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { status: err.status || 500, message: err.message } });
});

app.listen(PORT, () => console.log("Running on Port " + PORT));
