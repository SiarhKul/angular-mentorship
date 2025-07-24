const { readFromFile, saveToFile } = require("../../shared/fs.helpers");
const FilePath = require("../../shared/file-path");

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
}

module.exports = TransactionRepository;
