import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, default: "~" },
  country: { type: String, required: true },
  remote: { type: Boolean, default: false },
  available: { type: Boolean, required: true },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicant",
    },
  ],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = model("Post", postSchema);

export default Post;
