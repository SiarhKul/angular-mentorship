const crypto = require("node:crypto");

const { readFromFile, saveToFile } = require("../../../shared/fs.helpers");
const TransactionRepository = require("../../../infrastructure/database/transaction.repository");
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

async function getAllTransactions() {
  try {
    const transactions = await readFromFile(TRANSACTIONS_FILE_PATH);
    return transactions;
  } catch (error) {
    throw new Error(`Failed to retrieve transactions: ${error.message}`);
  }
}

async function deleteTransaction(id) {
  try {
    TransactionRepository.deleteTransaction(id);
  } catch (error) {
    throw new Error(`Failed to delete transaction: ${error.message}`);
  }
}

async function updateTransaction(transaction) {
  TransactionRepository.update(transaction);
}

module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
};
