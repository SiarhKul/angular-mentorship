const { readFromFile, saveToFile } = require("../../shared/fs.helpers");
const FilePath = require("../../shared/file-path");

class TransactionRepository {
  static deleteTransaction = async (id) => {
    console.log("Repository", id);
    const transactionsDb = await readFromFile(FilePath.TRANSLATIONS);

    const transactionsFiltered = transactionsDb.filter((t) => t.id !== id);

    saveToFile(FilePath.TRANSLATIONS, transactionsFiltered);
  };

  static async update(transaction) {}
}

module.exports = TransactionRepository;
