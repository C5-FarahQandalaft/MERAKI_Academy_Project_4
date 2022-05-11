const express = require("express");

// Import users controllers
const { createEmployee, createCompany } = require("../controllers/register");
const { applyToJob, getAllAppliedJobs } = require("../controllers/appliedjob");
const getCompanyPosts = require("../controllers/postedjob");

//import middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// creating usersRouter
const usersRouter = express.Router();

// create employee
usersRouter.post("/create/employee", createEmployee);

// create company
usersRouter.post("/create/company", createCompany);

// get all applied jobs
usersRouter.get(
  "/appliedjob",
  authentication,
  authorization("employee"),
  getAllAppliedJobs
);

// add post by id to the applied job section
usersRouter.post(
  "/appliedjob/:id",
  authentication,
  authorization("employee"),
  applyToJob
);

// get company posts
usersRouter.get(
  "/postedjobs",
  authentication,
  authorization("company"),
  getCompanyPosts
);

module.exports = usersRouter;
