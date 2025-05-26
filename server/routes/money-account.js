const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("Received request for money accounts:", req.body);

  res.json([{ id: 1 }]);
});

module.exports = router;
