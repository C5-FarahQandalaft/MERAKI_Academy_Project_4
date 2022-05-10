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
          Employee.findById(req.token.userId)
            .then((employee) => {
              post.applicants.push(req.token.userId);
              post.save();
              employee.appliedJobs.push(post);
              employee.save();
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

module.exports = {
  applyToJob,
};
