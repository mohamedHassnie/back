const express = require("express");
const router = express.Router();
const v8 = require("v8");
router.get("/ping", async (req, res, next) => {
  try {
    const { email } = req.body;
    res.status(200).json({ message: "ok" });
    const totalheapsize = v8.getHeapSpaceStatistics().total_available_size;
    let totalheapsizeInGB = (totalheapsize / 1024 / 1024 / 1024).toFixed(2);
    console.log(totalheapsizeInGB, email);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
