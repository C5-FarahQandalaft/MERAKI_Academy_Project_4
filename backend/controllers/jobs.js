const Post = require("../models/postSchema");
const Company = require("../models/companySchema");

// This function creates new post
const createPost = (req, res) => {
  const {
    title,
    description,
    url,
    salary,
    location,
    remote,
    available,
    type,
    experience,
  } = req.body;
  const newPost = new Post({
    company: req.token.userId,
    title,
    url,
    description,
    salary,
    location,
    remote,
    available,
    type,
    experience,
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
    .populate([
      {
        path: "comments",
        model: "Comment",
        select: "-_id",
        populate: {
          path: "commenterCompany",
          model: "Company",
          select: "name -_id",
        },
      },
      {
        path: "comments",
        model: "Comment",
        select: "-_id",
        populate: {
          path: "commenterEmployee",
          model: "Employee",
          select: "firstName lastName -_id",
        },
      },
    ])
    .populate("company", "name -_id")
    .then((jobs) => {
      if (jobs.length) {
        res.status(200).json({
          success: true,
          message: `All the jobs`,
          jobs: jobs.reverse(),
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

//this function returns paginated jobs
const getPaginate = (req, res) => {
  const { page = 1, limit = 9 } = req.query;

  Post.find({})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate([
      {
        path: "comments",
        model: "Comment",
        select: "-_id",
        populate: {
          path: "commenterCompany",
          model: "Company",
          select: "name -_id",
        },
      },
      {
        path: "comments",
        model: "Comment",
        select: "-_id",
        populate: {
          path: "commenterEmployee",
          model: "Employee",
          select: "firstName lastName -_id",
        },
      },
    ])
    .populate("company", "name -_id")
    .then(async (jobs) => {
      if (jobs.length) {
        const count = await Post.estimatedDocumentCount();
        res.status(200).json({
          success: true,
          message: `All the jobs`,
          jobs: jobs.reverse(),
          totalPages: Math.ceil(count / limit),
          currentPage: page,
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
      Company.findOneAndUpdate(
        { _id: req.token.userId },
        { $pull: { postedJobs: id } },
        { new: true }
      )
        .then(() => {
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
    .populate([
      {
        path: "comments",
        model: "Comment",
        select: "-_id",
        populate: {
          path: "commenterCompany",
          model: "Company",
          select: "name -_id",
        },
      },
      {
        path: "comments",
        model: "Comment",
        select: "-_id",
        populate: {
          path: "commenterEmployee",
          model: "Employee",
          select: "firstName lastName -_id",
        },
      },
    ])
    .populate("company", "name -_id")
    .then((post) => {
      const filtered = post.filter((element) => {
        return element.company.name.toLowerCase().includes(name.toLowerCase());
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

  Post.find({})
    .populate([
      {
        path: "comments",
        model: "Comment",
        select: "-_id",
        populate: {
          path: "commenterCompany",
          model: "Company",
          select: "name -_id",
        },
      },
      {
        path: "comments",
        model: "Comment",
        select: "-_id",
        populate: {
          path: "commenterEmployee",
          model: "Employee",
          select: "firstName lastName -_id",
        },
      },
    ])
    .populate("company", "name -_id")
    .then((post) => {
      const filtered = post.filter((element) => {
        return element.title.toLowerCase().includes(title.toLowerCase());
      });
      if (!filtered.length) {
        return res.status(404).json({
          success: false,
          message: `The posts not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All posts with title ${title}`,
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

// this function to find post by id
const findPostById = (req, res) => {
  let id = req.params.id;
  Post.findById(id)
    .populate([
      {
        path: "comments",
        model: "Comment",
        select: "",
        populate: {
          path: "commenterCompany",
          model: "Company",
          select: "name",
        },
      },
      {
        path: "comments",
        model: "Comment",
        select: "",
        populate: {
          path: "commenterEmployee",
          model: "Employee",
          select: "firstName lastName",
        },
      },
    ])
    .populate("company", "name -_id")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Post is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Post with id : ${id} `,
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
  deletePostById,
  findPostsByCompany,
  findPostsByTitle,
  findPostById,
  getPaginate,
};
