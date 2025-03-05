const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    thumbnail: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
