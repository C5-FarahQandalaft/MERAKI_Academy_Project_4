const express = require("express");

// Import comment controllers

// creating commentRouter
const commentRouter = express.Router();

// comment on post
commentRouter.post("/:post_id");

// delete comment by id
commentRouter.delete("/:id");

//update comment by id
commentRouter.put("/update/:id");

module.exports = commentRouter;
