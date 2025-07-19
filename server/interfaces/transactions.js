const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
} = require("../core/domain/use-cases/createTransactionUC.js");
const {
  log,
} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server/index.js");

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
  try {
    console.log(id);
    res.status(200).json([]);
  } catch (error) {}
});

module.exports = router;
