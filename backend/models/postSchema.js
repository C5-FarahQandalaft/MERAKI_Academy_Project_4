const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  url: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  experience: { type: String, default: "Entry-level" },
  salary: { type: String, default: "0" },
  location: { type: String, required: true },
  type: { type: String, required: true },
  remote: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
