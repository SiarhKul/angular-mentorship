var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.json([{id: 1, name: "Johnson"}]);
});

module.exports = router;
