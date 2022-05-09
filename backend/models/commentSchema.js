import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  comment: { type: String, required: true },
  commenterEmployee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  commenterCompany: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

const Comment = model("Comment", commentSchema);

export default Comment;
