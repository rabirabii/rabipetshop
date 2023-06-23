const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed"],
    default: "Pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
