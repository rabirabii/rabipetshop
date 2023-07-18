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

router.post("/create-doctor", upload.single("file"), async (req, res, next) => {
  try {
    const {
      email,
      name,
      password,
      description,
      graduatedFrom,
      experience,
      licenseNumber,
      speciality,
    } = req.body;
    const doctorEmail = await Doctor.findOne({ email });

    if (doctorEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const doctor = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
      description: description,
      graduatedFrom: graduatedFrom,
      experience: experience,
      licenseNumber: licenseNumber,
      speciality: speciality,
    };

    const activationToken = createActivationToken(doctor);

    const activationUrl = `http://localhost:3000/doctor/activation/${activationToken}`;

    try {
      await sendMail({
        email: doctor.email,
        subject: "Active your Account",
        message: `Hello ${doctor.name}, please click on the link below to activate your account : ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email :- ${doctor.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Create activation token for doctor
const createActivationToken = (doctor) => {
  return jwt.sign(doctor, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Active doctor Account
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newDoctor = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newDoctor) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newDoctor;

      let doctor = await Doctor.findOne({ email });

      if (doctor) {
        return next(new ErrorHandler("Doctor already exists", 400));
      }
      doctor = await Doctor.create({
        name,
        email,
        avatar,
        password,
      });

      sendDoctorToken(doctor, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login Doctor
router.post(
  "/login-doctor",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new ErrorHandler("Please enter a valid email and password", 400)
        );
      }

      const user = await Doctor.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Please provide a valid password", 400));
      }

      sendDoctorToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load doctor
router.get(
  "/getDoctor",
  isDoctor,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const doctor = await Doctor.findById(req.doctor.id);

      if (!doctor) {
        return next(new ErrorHandler("User does not exist", 400));
      }

      res.status(200).json({
        success: true,
        doctor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Log out for Doctor
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("doctor_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: " Log out successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get Doctor info
router.get(
  "/get-doctor-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const doctor = await Doctor.findById(req.params.id);
      res.status(201).json({
        success: true,
        doctor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// // Reservation Doctor
// router.post(
//   "/:id/reservation",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { name, time } = req.body;

//       const doctor = await Doctor.findById(id);

//       if (!doctor) {
//         return res.status(404).json({ error: "Doctor not found" });
//       }

//       // Check if the doctor already has a reservation at the specified time
//       const existingReservation = await Reservation.findOne({
//         doctor: id,
//         time: new Date(time),
//       });

//       if (existingReservation) {
//         return res
//           .status(400)
//           .json({ error: "Doctor is not available at the specified time" });
//       }

//       const reservation = new Reservation({
//         doctor: id,
//         name,
//         time,
//         status: "Pending",
//       });

//       await reservation.save();

//       doctor.reservations.push(reservation._id);
//       await doctor.save();

//       res.status(200).json({
//         success: true,
//         reservation,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// Update Doctor profile Picture
router.put(
  "/update-doctor-profile",
  isDoctor,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await Doctor.findById(req.doctor._id);

      const existsAvatarPath = `uploads/${existsUser.avatar}`;

      fs.unlinkSync(existsAvatarPath);
      const fileUrl = path.join(req.file.filename);

      const doctor = await Doctor.findByIdAndUpdate(req.doctor._id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        doctor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update doctor info
router.put(
  "/update-doctor-info",
  isDoctor,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        name,
        email,
        password,
        description,
        graduatedFrom,
        experience,
        licenseNumber,
        speciality,
        startTime,
        endTime,
      } = req.body;

      const doctor = await Doctor.findOne({ email }).select("+password");

      if (!doctor) {
        return next(new ErrorHandler("User not found", 400));
      }
      const isPasswordValid = await doctor.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Please enter a correct password", 400));
      }
      doctor.name = name;
      doctor.email = email;
      doctor.description = description;
      doctor.graduatedFrom = graduatedFrom;
      doctor.experience = experience;
      doctor.licenseNumber = licenseNumber;
      doctor.speciality = speciality;
      doctor.startTime = startTime;
      doctor.endTime = endTime;
      await doctor.save();

      res.status(201).json({
        success: true,
        doctor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update doctor Password
router.put(
  "/update-doctor-password",
  isDoctor,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const doctor = await Doctor.findById(req.doctor.id).select("+password");

      const isPasswordMatched = await doctor.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
      }

      doctor.password = req.body.newPassword;

      await doctor.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
router.get(
  "/get-reservation-doctor",
  isDoctor,
  catchAsyncErrors(async (res, req, next) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.body.userId });
      const reservation = await Reservation.find({ doctorId: doctor._id });
      res.status(200).json({
        success: true,
        data: reservation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update the reservation status
router.post(
  "/updateReservationStatus",
  isDoctor,
  catchAsyncErrors(async (res, req, next) => {
    try {
      const { reservationId, status } = req.body;
      const reservation = await Reservation.findByIdAndUpdate(reservationId, {
        status,
      });
    } catch (error) {}
  })
);
// Get all doctors
router.get(
  "/get-all-doctors",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const startIndex = (page - 1) * limit;

      const endIndex = page * limit;

      const totalDoctors = await Doctor.countDocuments();
      const totalPages = Math.ceil(totalDoctors / limit);

      const doctors = await Doctor.find()
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);

      res.status(201).json({
        success: true,
        doctors,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
// get all doctor for Admin
router.get(
  "/admin-all-doctors",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const doctors = await Doctor.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        doctors,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete doctor for Admin
router.delete(
  "/delete-doctor/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const doctor = await Doctor.findById(req.params.id);

      if (!doctor) {
        return next(new ErrorHandler("Doctor not found", 400));
      }

      await Doctor.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Doctor successfully deleted",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
