const express = require("express");

// Import middleware
const authentication = require("../middleware/authentication");

// Import comment controllers
const {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
} = require("../controllers/comment");

// creating commentRouter
const commentRouter = express.Router();

// new comment on post
commentRouter.post("/create/:post_id", authentication, createComment);

// delete comment by id
commentRouter.delete("/:id", authentication, deleteComment);

//update comment by id
commentRouter.put("/update/:id", authentication, updateComment);

//get comment by id
commentRouter.get("/show/:id", getCommentById);

module.exports = commentRouter;
