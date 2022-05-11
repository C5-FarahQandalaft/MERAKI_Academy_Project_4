const Post = require("../models/postSchema");
const Company = require("../models/companySchema");

// This function creates new post
const createPost = (req, res) => {
  const { title, description, salary, country, remote, available } = req.body;
  const newPost = new Post({
    companyId: req.token.userId,
    company: req.token.company,
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
      Company.findOneAndUpdate(
        { _id: req.token.userId },
        { $push: { postedJobs: post } },
        { new: true }
      )
        .then(() => {
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

// This function deletes post by its id
const deletePostById = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The post is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Post deleted`,
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

//This function returns posts by company
const findPostsByCompany = (req, res) => {
  let name = req.params.name;

  Post.find({})
    .then((post) => {
      const filtered = post.filter((element) => {
        return element.company.toLowerCase().includes(name.toLowerCase());
      });
      if (!filtered.length) {
        return res.status(404).json({
          success: false,
          message: `No posts found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the posts from companies name included ${name}`,
        post: filtered,
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

//This function returns posts by title
const findPostsByTitle = (req, res) => {
  let title = req.params.title;

  Post.find({ title })
    .then((post) => {
      if (!post.length) {
        return res.status(404).json({
          success: false,
          message: `The posts not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All posts with title ${title}`,
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

module.exports = {
  createPost,
  getAllJobs,
  updatePostById,
  deletePostById,
  findPostsByCompany,
  findPostsByTitle,
};
