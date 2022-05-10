const Post = require("../models/postSchema");

// This function creates new post
const createPost = (req, res) => {
  const { title, description, salary, country, remote, available } = req.body;
  const newPost = new Post({
    company: req.token.userId,
    title,
    description,
    salary,
    country,
    remote,
    available,
  });

  newPost
    .save()
    .then((post) => {
      res.status(201).json({
        success: true,
        message: `Post created`,
        post: post,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// This function returns all jobs
const getAllJobs = (req, res) => {
  Post.find({})
    .populate("company", "name -_id")
    // .populate("comments")
    .then((jobs) => {
      if (jobs.length) {
        res.status(200).json({
          success: true,
          message: `All the jobs`,
          jobs: jobs,
          comments: jobs.comments,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No jobs Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// This function updates post by its id
const updatePostById = (req, res) => {
  const _id = req.params.id;
  Post.findByIdAndUpdate(_id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Post is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Post updated`,
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
module.exports = {
  createPost,
  getAllJobs,
  updatePostById,
};
