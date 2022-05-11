const Post = require("../models/postSchema");
const Employee = require("../models/employeeSchema");

// This function allow employee to apply for job
const applyToJob = (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((post) => {
      if (post.applicants.includes(req.token.userId)) {
        res.status(405).json({
          success: false,
          message: `You already applied`,
        });
      } else {
        if (post.available) {
          Employee.findOneAndUpdate(
            { _id: req.token.userId },
            { $push: { appliedJobs: post } },
            { new: true }
          )
            .then(() => {
              Post.findOneAndUpdate(
                { _id: postId },
                { $push: { applicants: req.token.userId } },
                { new: true }
              )
                .then(() => {
                  res.status(200).json({
                    success: true,
                    message: `Successfully applied for this job`,
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
        } else {
          res.status(405).json({
            success: true,
            message: `This job is not available anymore`,
          });
        }
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

//this function show all applied job
const getAllAppliedJobs = (req, res) => {
  Employee.findById(req.token.userId)
    .populate([
      {
        path: "appliedJobs",
        model: "Post",
        populate: {
          path: "comments",
          model: "Comment",
          select: "-_id",
          populate: {
            path: "commenterCompany",
            model: "Company",
            select: "name -_id",
          },
        },
      },
      {
        path: "appliedJobs",
        model: "Post",
        populate: {
          path: "comments",
          model: "Comment",
          select: "-_id",
          populate: {
            path: "commenterEmployee",
            model: "Employee",
            select: "firstName lastName -_id",
          },
        },
      },
      {
        path: "appliedJobs",
        model: "Post",
        populate: {
          path: "company",
          model: "Company",
          select: "name -_id",
        },
      },
    ])
    .then((jobs) => {
      if (jobs.appliedJobs.length) {
        res.status(200).json({
          success: true,
          message: `All the jobs`,
          jobs: jobs.appliedJobs,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No applied jobs found`,
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

module.exports = {
  applyToJob,
  getAllAppliedJobs,
};
