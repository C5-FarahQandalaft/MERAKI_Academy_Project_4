const express = require("express");

// Import jobs controllers

// creating jobsRouter
const jobsRouter = express.Router();

//get all posts
jobsRouter.get("/");

// create post
jobsRouter.post("/createPost");

// update post
jobsRouter.put("/updatePost/:id");

// delete post
jobsRouter.delete("/deletePost/:id");

// get posts by company
jobsRouter.get("/search_1/:name");

// get posts by title
jobsRouter.get("/search_2/:title");

module.exports = jobsRouter;
