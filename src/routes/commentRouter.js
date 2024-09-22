const router = require("express").Router();
const {
  createComment,
  getComments,
  getCommentById,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");

router.get("/", getComments);
router.get("/:id", getCommentById);
router.post("/create", createComment);
router.put("/update/:id", updateComment);
router.delete("/delete/:id", deleteComment);


module.exports = router;
