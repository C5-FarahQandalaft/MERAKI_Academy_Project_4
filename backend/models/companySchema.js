const mongoose = require("mongoose");

//import bcrypt
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  field: { type: String },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

//hashing password and lowercase email and name
companySchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
