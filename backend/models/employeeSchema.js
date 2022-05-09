import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  degree: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appliedJobs: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const Employee = model("Employee", employeeSchema);

export default Employee;
