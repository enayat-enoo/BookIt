const express = require("express");
const router = express.Router();
const experienceModel = require("../models/Experience");

router.get("/", async (req, res) => {
  try {
    const data = await experienceModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exp = await experienceModel.findById(req.params.id);
    res.status(200).json(exp);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
