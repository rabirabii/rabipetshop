const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendDoctorToken = require("../utils/doctorToken");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Doctor = require("../model/doctor");
const { isAuthenticated, isAdmin, isDoctor } = require("../middleware/auth");
const Reservation = require("../model/reservation");
const User = require("../model/user");
// Reservation Doctor
router.post(
  "/reservation-doctor",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { doctorId, name, time } = req.body;

      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ error: "Doctor not found" });
      }

      const existingReservation = await Reservation.findOne({
        doctor: doctorId,
        time: new Date(time),
      });

      if (existingReservation) {
        return res.status(400).json({
          error: "Doctor is not available at the specified time",
        });
      }

      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const reservation = new Reservation({
        doctor: doctorId,
        user: userId,
        name,
        time,
        status: "Pending",
      });

      await reservation.save();

      doctor.reservations.push(reservation._id);
      await doctor.save();

      res.status(200).json({
        success: "Reservation created successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update Reservation for user
router.put(
  "update-reservation/:reservationId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { reservationId } = req.params;
      const { name, time } = req.body;

      const reservation = await Reservation.findById(reservationId);
      if (!reservation) {
        return res.status(404).json({
          error: "Reservation not found",
        });
      }

      // Check if the user has accesed to this reservation
      if (reservation.user.toString() !== req.user.id) {
        return res.status(403).json({ error: " Access denied" });
      }

      reservation.name = name;
      reservation.time = time;
      await reservation.save();

      res.satatus(200).json({
        success: true,
        reservation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get All reservation for user
router.get(
  "/getAllReservation/:userId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const reservations = await Reservation.find({
        user_id: req.params.userId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        reservations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Delete Reservation for Doctor
router.delete(
  "/delete-reservation-doctor/:reservationId",
  isDoctor,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { reservationId } = req.params;

      const reservation = await Reservation.findById(reservationId);
      if (!reservation) {
        return res.status(404).json({
          error: "Reservation not found",
        });
      }

      await reservation.remove();

      res.status(200).json({
        success: true,
        message: "Reservation deleted successfully",
      });
    } catch (error) {
      // Handle error
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// GetAll Reservasi untuk Dokter
router.get(
  "/getAllReservation-doctor",
  isDoctor,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const doctorId = req.user.id;

      const reservations = await Reservation.find({ doctor: doctorId });

      res.status(200).json({
        success: true,
        reservations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
