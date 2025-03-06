const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");

const router = express.Router();

// Storage for Profile Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Upload Profile Image
router.post("/upload", upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.body.userId;
    const imageUrl = `/uploads/${req.file.filename}`;

    await User.findByIdAndUpdate(userId, { avatar: imageUrl });

    res.json({ message: "Profile image uploaded successfully", imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Profile image upload failed" });
  }
});

module.exports = router;
