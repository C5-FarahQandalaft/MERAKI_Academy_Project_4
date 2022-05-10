const Employee = require("../models/employeeSchema");
const Company = require("../models/companySchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// This function checks employee login credentials
const loginEmployee = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  Employee.findOne({ email })
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The email doesn't exist`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          employee: `${result.firstName} ${result.lastName}`,
          typeOfUser: "employee",
        };

        const token = await jwt.sign(payload, process.env.SECRET);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// This function checks company login credentials
const loginCompany = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  Company.findOne({ email })
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The email doesn't exist`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          company: result.name,
          typeOfUser: "company",
        };

        const token = await jwt.sign(payload, process.env.SECRET);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
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
  loginEmployee,
  loginCompany,
};
