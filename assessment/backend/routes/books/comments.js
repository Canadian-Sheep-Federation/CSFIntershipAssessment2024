const express = require("express");
const axios = require("axios");
const Comment = require('../../models/comment');

const router = express.Router();
const HttpStatusCode = axios.HttpStatusCode;

// Create a new comment under a specific book
router.post("/:key/comments", async (req, res) => {
  try {
    console.log(req.params)
    const { key } = req.params;
    const { name, email, content } = req.body;
    const comment = await Comment.create({
      name,
      email,
      content,
      bookKey: key,
    });
    res.status(HttpStatusCode.Created).json({
      success: true,
      message: "Create new comment successfully!",
      data: comment,
    });
  } catch (error) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all comments under a specific book
router.get("/:key/comments", async (req, res) => {
  try {
    const { key } = req.params;
    const comments = await Comment.findAll({
      where: { bookKey: key },
      order: [['createdAt', 'DESC']]
    });
    res.status(HttpStatusCode.Ok).json({
      success: true,
      message: "success",
      data: comments,
    });
  } catch (error) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      message: error.message,
    });
  }
});

// Get a specific comment by ID under a specific book
router.get("/:key/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.status(HttpStatusCode.Ok).json({
        success: true,
        message: "success",
        data: comment,
      });
    } else {
      res.status(HttpStatusCode.NotFound).json({
        success: false,
        message: "Comment not found!",
      });
    }
  } catch (error) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      message: error.message,
    });
  }
});

// Update a comment by ID under a specific book
router.put("/:key/comments/:id", async (req, res) => {
  try {
    const { key, id } = req.params;
    const { name, email, content } = req.body;
    const comment = await Comment.findOne({ where: { id, bookKey: key } });
    if (comment) {
      comment.name = name;
      comment.email = email;
      comment.content = content;
      await comment.save();
      res.status(HttpStatusCode.Ok).json({
        success: true,
        message: "success",
        data: comment,
      });
    } else {
      res.status(HttpStatusCode.NotFound).json({
        success: false,
        message: "Comment not found!",
      });
    }
  } catch (error) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete a comment by ID under a specific book
router.delete("/:key/comments/:id", async (req, res) => {
  try {
    const { key, id } = req.params;
    const comment = await Comment.findOne({ where: { id, bookKey: key } });
    if (comment) {
      await comment.destroy();
      res.status(HttpStatusCode.NoContent).json({
        success: true,
        message: "success",
      });
    } else {
      res.status(HttpStatusCode.NotFound).json({
        success: false,
        message: "Comment not found!",
      });
    }
  } catch (error) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
