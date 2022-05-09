import { Schema, model } from "mongoose";

const companySchema = new Schema({
  name: { type: String, required: true, unique: true },
  field: { type: String },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  postedJobs: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const Company = model("Company", companySchema);

export default Company;
