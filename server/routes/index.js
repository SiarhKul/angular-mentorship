var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json('I am heathy')
});

module.exports = router;
