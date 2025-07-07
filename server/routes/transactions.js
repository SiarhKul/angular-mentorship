const express = require("express");
const router = express.Router();
const { writeFile, readFile } = require("node:fs/promises");
const crypto = require("node:crypto");

router.post("/", async (req, res) => {
  try {
    const id = crypto.randomUUID();
    const newTransaction = { id, ...req.body };

    const transactionsDb = JSON.parse(
      (await readFile("db.transactions.json", "utf-8")) || "[]",
    );

    transactionsDb.push(newTransaction);

    console.log("Existing transactions loaded:", transactionsDb);

    await writeFile(
      "db.transactions.json",
      JSON.stringify(transactionsDb, null, 2),
    );

    console.log("New transaction added:", newTransaction);
    res.json(newTransaction);
  } catch (err) {
    console.error("Error writing to db.transactions.json:", err);
    return res.status(500).json({ error: "Failed to write/read transaction" });
  }
});

router.get("/", async (_req, res) => {
  log("Received request to get all transactions");
  res
    .status(200)
    .json({ message: "This is a placeholder for the transactions endpoint." });
});

module.exports = router;
