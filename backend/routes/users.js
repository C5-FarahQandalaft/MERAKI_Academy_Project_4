const express = require("express");

// Import users controllers

// creating jobsRouter
const usersRouter = express.Router();

// create employee
usersRouter.post("/createEmployee");

// create company
usersRouter.post("/createCompany");

// get all applied jobs
usersRouter.get("/appliedjob");

// add post to the applied job
usersRouter.post("/appliedjob/:id");

// get company posts
usersRouter.get("/postedjobs");

module.exports = usersRouter;
