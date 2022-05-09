const express = require("express");

// Import login controllers

// creating loginRouter
const loginRouter = express.Router();

// login as employee
loginRouter.post("/employee");

// login as company
loginRouter.post("/company");

module.exports = loginRouter;
