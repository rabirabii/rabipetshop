const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Banner = require("../model/banner");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

// Create Banner
router.post(
  "/create-banner",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Assuming you are using "multer" for file uploads and have configured it properly

      // Retrieve the filenames of uploaded images from the "req.files" object
      const filenames = req.files.map((file) => file.filename);

      // Create an array to store the file paths of the uploaded images
      const filePaths = [];

      // Loop through the filenames and create the file paths
      filenames.forEach((filename) => {
        const filePath = `uploads/${filename}`;
        filePaths.push(filePath);
      });

      // Assuming you want to delete the uploaded files, as mentioned in your code
      filePaths.forEach((filePath) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Error deleting uploaded file" });
          }
        });
      });

      // Assuming you want to save the banner data received in the request body
      const bannerData = req.body;

      // Assuming you want to assign the file paths to the "image" property of the bannerData
      bannerData.image = filePaths;

      // Create the banner using the Banner model
      const banner = await Banner.create(bannerData);

      res.status(201).json({
        success: true,
        banner,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all Banners
router.get(
  "/get-all-banner",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const banners = await Banner.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        banners,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
