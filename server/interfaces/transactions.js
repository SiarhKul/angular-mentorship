const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
} = require("../core/domain/use-cases/createTransactionUC.js");

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
  try {
    const transactions = await getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
