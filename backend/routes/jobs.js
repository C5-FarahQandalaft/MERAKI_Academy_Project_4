const express = require("express");

// Import jobs controllers

// creating jobsRouter
const jobsRouter = express.Router();

//get all posts
jobsRouter.get("/");

// create post
jobsRouter.post("/createPost");

// update post by id
jobsRouter.put("/updatePost/:id");

// delete post by id
jobsRouter.delete("/deletePost/:id");

// get posts by company name
jobsRouter.get("/search_1/:name");

// get posts by post title
jobsRouter.get("/search_2/:title");

module.exports = jobsRouter;
