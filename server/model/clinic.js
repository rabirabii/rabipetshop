const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a clinic service name"],
    },
    description: {
      type: String,
      required: [true, "Please enter description!"],
    },
    clinicType: {
      type: Object,
      required: true,
    },
    price: {
      type: Number,
    },
    images: {
      type: String,
    },
    doctorId: {
      type: String,
    },
    doctor: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clinic", clinicSchema);
