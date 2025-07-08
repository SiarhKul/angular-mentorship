const express = require("express");
const router = express.Router();
const {
  createTransaction,
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
  console.log("Received request to get all transactions");
  res
    .status(200)
    .json({ message: "This is a placeholder for the transactions endpoint." });
});

module.exports = router;
