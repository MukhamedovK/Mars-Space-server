const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    student: { type: mongoose.Types.ObjectId, ref: "Students" },
    post: { type: mongoose.Types.ObjectId, ref: "Post" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", CommentSchema);
