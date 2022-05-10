const express = require("express");

// Import users controllers
const { createEmployee, createCompany } = require("../controllers/register");
// creating usersRouter
const usersRouter = express.Router();

// create employee
usersRouter.post("/create/employee", createEmployee);

// create company
usersRouter.post("/create/company", createCompany);

// get all applied jobs
usersRouter.get("/appliedjob");

// add post by id to the applied job section
usersRouter.post("/appliedjob/:id");

// get company posts
usersRouter.get("/postedjobs");

module.exports = usersRouter;
