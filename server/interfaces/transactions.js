const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
  getTransactionBy,
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

router.delete("/:id", async (req, res) => {
  try {
    const transactions = await deleteTransaction(req.params.id);

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body: catetory } = req;

  try {
    updateTransaction(id, catetory);

    res.status(200).json([]);
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tr = await getTransactionBy(id);
    res.status(200).json(tr);
  } catch (error) {}
});

module.exports = router;
