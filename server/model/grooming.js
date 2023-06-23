const mongoose = require("mongoose");

const groomingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a grooming service name"],
    },
    description: {
      type: String,
      required: [true, "Please enter description!"],
    },
    tipe: {
      type: Object,
      required: true,
    },
    price: {
      type: Number,
    },
    images: {
      type: String,
    },
    shopId: {
      type: String,
    },
    shop: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grooming", groomingSchema);
