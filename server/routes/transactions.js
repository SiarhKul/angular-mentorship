const express = require("express");
const router = express.Router();
const { writeFile, readFile } = require("node:fs/promises");
const crypto = require("node:crypto");

const TRANSACTIONS_FILE_PATH = "db.transactions.json";

async function readTransactions() {
  try {
    const data = await readFile(TRANSACTIONS_FILE_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    throw new Error("Failed to read transactions database");
  }
}

async function saveTransactions(transactions) {
  try {
    await writeFile(
      TRANSACTIONS_FILE_PATH,
      JSON.stringify(transactions, null, 2),
    );
  } catch (error) {
    throw new Error("Failed to save transactions to database");
  }
}

async function createTransaction(transactionData) {
  const id = crypto.randomUUID();
  const newTransaction = { id, ...transactionData };

  try {
    const transactions = await readTransactions();
    transactions.push(newTransaction);
    await saveTransactions(transactions);
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
  log("Received request to get all transactions");
  res
    .status(200)
    .json({ message: "This is a placeholder for the transactions endpoint." });
});

module.exports = router;
