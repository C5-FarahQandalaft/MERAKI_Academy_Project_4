const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const jobsRouter = require("./routes/jobs");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const commentRouter = require("./routes/comment");

// Routes Middleware
app.use("/jobs", jobsRouter);
app.use("/users",usersRouter);
app.use("/login",loginRouter);
app.use("/comment",commentRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
