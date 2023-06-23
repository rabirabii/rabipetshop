const mongoose = require("mongoose");

const groomingTypeSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Please enter a name for this Grooming Type"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GroomingType", groomingTypeSchema);
