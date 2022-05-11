const Company = require("../models/companySchema");

//this function show all posts for company
const getCompanyPosts = (req, res) => {
  Company.findById(req.token.userId)
    .populate([
      {
        path: "postedJobs",
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
        path: "postedJobs",
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
        path: "postedJobs",
        model: "Post",
        populate: {
          path: "company",
          model: "Company",
          select: "name -_id",
        },
      },
    ])
    .then((post) => {
      if (post.postedJobs.length) {
        res.status(200).json({
          success: true,
          message: `All the jobs`,
          post: post.postedJobs,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No posts found`,
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

module.exports = getCompanyPosts;
