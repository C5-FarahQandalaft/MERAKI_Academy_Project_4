//importing employee and company models
const Employee = require("../models/employeeSchema");
const Company = require("../models/companySchema");

//1-This function creates a new employee (new user)
const createEmployee = (req, res) => {
  const { firstName, lastName, age, country, degree, email, password } =
    req.body;
  const employee = new Employee({
    firstName,
    lastName,
    age,
    country,
    degree,
    email,
    password,
  });

  employee
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        employee: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//1-This function creates a new Company (new user)
const createCompany = (req, res) => {
  const { name, field, country, email, password } = req.body;
  const company = new Company({
    name,
    field,
    country,
    email,
    password,
  });

  company
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        company: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        if (err.message.includes(name)) {
          return res.status(409).json({
            success: false,
            message: `Company name already exists`,
          });
        }
        if (err.message.includes(email)) {
          return res.status(409).json({
            success: false,
            message: `The email already exists`,
          });
        }
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  createEmployee,
  createCompany,
};
