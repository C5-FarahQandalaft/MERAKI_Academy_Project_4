const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");

// function to create comment
const createComment = (req, res) => {
  const postId = req.params.post_id;
  const { comment } = req.body;
  if (req.token.typeOfUser === "employee") {
    const newComment = new Comment({
      comment,
      commenterEmployee: req.token.userId,
    });
    newComment
      .save()
      .then((result) => {
        Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: result._id } },
          { new: true }
        )
          .then(() => {
            res.status(201).json({
              success: true,
              message: `Comment added`,
              comment: result,
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
    const newComment = new Comment({
      comment,
      commenterCompany: req.token.userId,
    });
    newComment
      .save()
      .then((result) => {
        Post.findOneAndUpdate(
          { _id: postId },
          { $push: { comments: result._id } },
          { new: true }
        )
          .then(() => {
            res.status(201).json({
              success: true,
              message: `Comment added`,
              comment: result,
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
  }
};

// This function updates comment by its id
const updateComment = (req, res) => {
  const _id = req.params.id;
  Comment.findByIdAndUpdate(_id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The comment is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `comment updated`,
        comment: result,
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
  createComment,
  updateComment,
};
