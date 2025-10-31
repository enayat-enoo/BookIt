const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    date : String,
    available : Number
})

const experienceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  slots: [slotSchema]
});

const experienceModel = mongoose.model("experience", experienceSchema);
module.exports = experienceModel;