const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./interfaces/index");
const usersRouter = require("./interfaces/users");
const loginRouter = require("./interfaces/login");
const moneyAccountRouter = require("./interfaces/money-account");
const categoriesRouter = require("./interfaces/categories");
const transactionsRouter = require("./interfaces/transactions");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/money-account", moneyAccountRouter);
app.use("/categories", categoriesRouter);
app.use("/transactions", transactionsRouter);

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

module.exports = app;
