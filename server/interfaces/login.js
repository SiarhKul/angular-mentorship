const express = require("express");
const router = express.Router();

const FAKE_DB = [
  { id: 1, username: "Jon", password: "1" },
  { id: 2, username: "Ann", password: "1qaz" },
  { id: 3, username: "Bob", password: "2wsx" },
];

router.post("/", (req, res, next) => {
  const user = FAKE_DB.find((dbRecord) => {
    return dbRecord.username === req.body.username;
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }

  if (user.password !== req.body.password) {
    const error = new Error("Invalid password");
    error.statusCode = 401;
    return next(error);
  }

  const { password, ...userResponse } = user;

  res.json(userResponse);
});

module.exports = router;
