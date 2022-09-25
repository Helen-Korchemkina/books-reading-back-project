const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// const роут = require('./routes/шлях');
const authRouter = require('./src/routes/api/auth');
const userRouter = require('./src/routes/api/user');

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// app.use('/api/***', назва роута);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json(message);
});

module.exports = app;



