const jwt = require("jsonwebtoken");
require("dotenv").config();
isAdmin = (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(decoded);
    if (decoded.role !== "admin")
      return res.status(200).json("Unauthorize admin");
    next();
  } catch (e) {
    res.status(400).json("Token not valid-");
  }
};
verifyToken = (req, res, next) => {
  console.log(1);
  let token = req.headers.authorization;
  if (token === null || token === undefined || token === "") {
    throw new Error("Access denied! Token not found");
  }
  try {
    console.log(2);
    jwt.verify(token, process.env.SECRET_KEY, (error, response) => {
      if (error) throw new Error("Token has expired! Login again");
      req.user = response;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
