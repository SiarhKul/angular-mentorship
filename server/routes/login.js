const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  console.log('-----------------', req.body)
  res.json({jwt: '1234567890'});
});

module.exports = router;
