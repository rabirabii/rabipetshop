const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Please Enter a description for the banner"],
  },

  link: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
