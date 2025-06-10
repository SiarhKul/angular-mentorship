const express = require("express");
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
      console.log("Existing accounts loaded:", accounts);
    } catch (err) {
      console.error("Error reading db.json:", err);
      accounts = [];
    }

    const controller = new AbortController();
    const { signal } = controller;

    accounts.push(account);
    console.log("New account added:", account);
    await writeFile("db.json", JSON.stringify(accounts, null, 2), { signal });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to write account" });
  }

  res.json(account);
});

router.get("/", async (req, res) => {
  console.log("Received request for money accounts");

  try {
    const fileData = await readFile("db.json", "utf-8");
    let accounts = [];
    try {
      accounts = JSON.parse(fileData);
      if (!Array.isArray(accounts)) accounts = [];
    } catch {
      accounts = [];
    }
    log("Accounts loaded:", accounts);
    res.json(accounts);
  } catch (err) {
    console.error("Error reading db.json:", err);
    res.status(500).json({ error: "Failed to read accounts" });
  }
});

module.exports = router;
