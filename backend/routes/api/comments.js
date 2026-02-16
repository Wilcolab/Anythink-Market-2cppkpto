const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:postId", async (req, res) => {
  try {
    const { content, author } = req.body;
    const newComment = new Comment({
      postId: req.params.postId,
      content,
      author,
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}   );