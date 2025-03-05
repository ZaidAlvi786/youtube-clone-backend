const express = require("express");
const multer = require("multer");
const Video = require("../models/Video");

const router = express.Router();

// Video Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload Video
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const video = await Video.create({
      title,
      description,
      url: `/uploads/${req.file.filename}`,
      thumbnail: `/thumbnails/default.jpg`,
    });

    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    res.status(500).json({ error: "Video upload failed" });
  }
});

module.exports = router;
