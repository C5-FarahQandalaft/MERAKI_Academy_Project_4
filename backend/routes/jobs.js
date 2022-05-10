const express = require("express");

// Import jobs controllers
const {
  createPost,
  getAllJobs,
  updatePostById,
  deletePostById,
} = require("../controllers/jobs");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// creating jobsRouter
const jobsRouter = express.Router();

//get all posts
jobsRouter.get("/", getAllJobs);

// create post
jobsRouter.post(
  "/create/post",
  authentication,
  authorization("company"),
  createPost
);

// update post by id
jobsRouter.put(
  "/update/post/:id",
  authentication,
  authorization("company"),
  updatePostById
);

// delete post by id
jobsRouter.delete(
  "/delete/post/:id",
  authentication,
  authorization("company"),
  deletePostById
);

// get posts by company name
jobsRouter.get("/search_1/:name");

// get posts by post title
jobsRouter.get("/search_2/:title");

module.exports = jobsRouter;
