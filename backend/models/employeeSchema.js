const mongoose = require("mongoose");

//import bcrypt
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  degree: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

employeeSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
