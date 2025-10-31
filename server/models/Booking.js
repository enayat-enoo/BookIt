const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "experience" },
  name: String,
  email: String,
  slot: String,
  price: Number,
  status: { type: String, default: "confirmed" },
});

const bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel;
