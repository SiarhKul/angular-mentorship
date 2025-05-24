const express = require('express');
const router = express.Router();

const FAKE_DB = [
  {id: 1, username: "Jon", password: "12345"},
  {id: 2, username: "Ann", password: "1qaz"},
  {id: 3, username: "Bob", password: "2wsx"},
]


router.post('/', (req, res, next) => {
  console.log('-----------------', req.body)

  const isUserExists = FAKE_DB.some((dbRecord) => {
    return dbRecord.username === req.body.username
  });
  console.log('1111111111', isUserExists)
  if (!isUserExists) {
    throw new Error('User already exists');
  }

  res.json({jwt: crypto.randomUUID()});
});

module.exports = router;
