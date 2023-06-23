const mongoose = require("mongoose");

const clinicTypeSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Please enter a name for this Clinic Type"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ClinicType", clinicTypeSchema);
