const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, default: 0 },
  country: { type: String, required: true },
  remote: { type: Boolean, default: false },
  available: { type: Boolean, required: true, default: true },
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
