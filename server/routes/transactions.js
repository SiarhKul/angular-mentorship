const express = require("express");
const router = express.Router();
const crypto = require("node:crypto");
const { readFromFile, saveToFile } = require("../shared/fs.helpers.js");

const TRANSACTIONS_FILE_PATH = "db.transactions.json";

async function createTransaction(transactionData) {
  const id = crypto.randomUUID();
  const newTransaction = { id, ...transactionData };

  try {
    const transactions = await readFromFile(TRANSACTIONS_FILE_PATH);
    transactions.push(newTransaction);
    await saveToFile(TRANSACTIONS_FILE_PATH, transactions);
    return newTransaction;
  } catch (error) {
    throw new Error(`Failed to create transaction: ${error.message}`);
  }
}

router.post("/", async (req, res) => {
  try {
    const newTransaction = await createTransaction(req.body);
    console.log("New transaction added:", newTransaction);
    res.json(newTransaction);
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (_req, res) => {
  console.log("Received request to get all transactions");
  res
    .status(200)
    .json({ message: "This is a placeholder for the transactions endpoint." });
});

module.exports = router;
