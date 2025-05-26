const express = require("express");
const router = express.Router();
const { writeFile } = require("node:fs/promises");

router.post("/", async (req, res) => {
  console.log("Received request for money accounts:", req.body);

  const account = req.body;
  account.id = Date.now(); // Assign a unique ID based on the current timestamp

  try {
    const controller = new AbortController();
    const { signal } = controller;

    const data = JSON.stringify(req.body, null, 2);
    await writeFile("db.json", data, { signal });
  } catch (err) {
    console.error(err);
  }

  res.json(account);
});

module.exports = router;
