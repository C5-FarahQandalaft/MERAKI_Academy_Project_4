const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  commenterEmployee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  commenterCompany: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
