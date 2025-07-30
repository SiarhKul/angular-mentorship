const { readFromFile, saveToFile } = require("../../shared/fs.helpers");
const FilePath = require("../../shared/file-path");
const {
  log,
} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");

class TransactionRepository {
  static deleteTransaction = async (id) => {
    const transactionsDb = await readFromFile(FilePath.TRANSLATIONS);

    const transactionsFiltered = transactionsDb.filter((t) => t.id !== id);

    saveToFile(FilePath.TRANSLATIONS, transactionsFiltered);
  };

  static async update(id, transaction) {
    const transactionsDb = await readFromFile(FilePath.TRANSLATIONS);

    const transactionsUpdated = transactionsDb.map((t) => {
      if (t.id === id) {
        return { ...t, ...transaction };
      } else {
        return t;
      }
    });
    console.log({ id, transaction, transactionsUpdated });

    saveToFile(FilePath.TRANSLATIONS, transactionsUpdated);
  }
  static async getBy(transactionId) {
    const transactionsDb = await readFromFile(FilePath.TRANSLATIONS);
    console.log("Transaction from the Db", transactionsDb);
    const trans = transactionsDb.filter(
      (tr) => tr.transactionId === transactionId,
    );
    console.log("transactionId", transactionId);
    // console.log("Transactions", trans);
    return trans;
  }
}

module.exports = TransactionRepository;
