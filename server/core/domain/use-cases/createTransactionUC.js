const crypto = require("node:crypto");

const { readFromFile, saveToFile } = require("../../../shared/fs.helpers");

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

module.exports = {
  createTransaction,
};
