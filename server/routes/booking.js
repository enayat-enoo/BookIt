const express = require("express");
const router = express.Router();
const bookingModel = require("../models/Booking");
const experienceModel = require("../models/Experience");

router.post("/", async (req, res) => {
  try {
    const { experienceId, name, email, slot, price } = req.body;
    const experience = await experienceModel.findById(experienceId);
    const slotData = experience.slots.find((s) => s.date === slot);

    if (!slotData || slotData.available <= 0)
      return res
        .status(400)
        .json({ success: false, message: "Slot unavailable" });

    slotData.available -= 1;
    await experience.save();

    const booking = await bookingModel.create({
      experienceId,
      name,
      email,
      slot,
      price,
    });
    res.status(201).json({
      success: true,
      message: "Booking confirmed",
      bookingId: booking._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Booking failed" });
  }
});

router.post("/promo", (req, res) => {
  const { code } = req.body;
  const promos = { SAVE10: 10, FLAT100: 100 };
  if (promos[code]) return res.status(200).json({ valid: true, discount: promos[code] });
  res.json({ valid: false });
});

module.exports = router;