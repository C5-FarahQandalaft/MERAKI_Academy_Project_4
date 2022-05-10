const express = require("express");

// Import login controllers
const { loginEmployee, loginCompany } = require("../controllers/login");

// creating loginRouter
const loginRouter = express.Router();

// login as employee
loginRouter.post("/employee", loginEmployee);

// login as company
loginRouter.post("/company", loginCompany);

module.exports = loginRouter;
