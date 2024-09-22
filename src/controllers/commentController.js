const Comment = require("../models/CommentModel");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments.length) {
      return res.status(404).json({ message: "Comments not found" });
    }
    res.status(200).json({ data: comments });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ message: err.message });
  }
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ data: comment });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ message: err.message });
  }
};

const createComment = async (req, res) => {
  const { student } = req.params;
  const { text, post } = req.body;
  try {
    const newComment = new Comment({ text, post, student });
    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment created successful", data: newComment });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ message: err.message });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res
      .status(200)
      .json({ message: "Comment updated successful", data: updatedComment });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successful" });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
