const express = require("express");
const { log } = require("node:console");
const { read } = require("node:fs");
const router = express.Router();
const { writeFile } = require("node:fs/promises");
const { readFile } = require("node:fs/promises");

router.post("/", async (req, res) => {
  console.log("Received request for money accounts:", req.body);

  const account = req.body;
  account.id = Date.now();

  try {
    let accounts = [];

    try {
      const fileData = await readFile("db.json", "utf-8");
      accounts = JSON.parse(fileData);
      log("Existing accounts loaded:", accounts);
    } catch (err) {
      console.error("Error reading db.json:", err);
      accounts = [];
    }

    const controller = new AbortController();
    const { signal } = controller;

    accounts.push(account);
    log("New account added:", account);
    await writeFile("db.json", JSON.stringify(accounts, null, 2), { signal });
  } catch (err) {
    console.error(err);
  }

  res.json(account);
});

module.exports = router;
