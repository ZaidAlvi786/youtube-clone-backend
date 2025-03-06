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

// ✅ GET All Videos (Fix for Frontend `GET /api/videos` Request)
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// ✅ Upload Video
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

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
