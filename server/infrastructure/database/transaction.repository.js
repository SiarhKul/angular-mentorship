const { readFromFile, saveToFile } = require("../../shared/fs.helpers");
const FilePath = require("../../shared/file-path");

class TransactionRepository {
  static deleteTransaction = async (id) => {
    console.log("Repository", id);
    const transactions = await readFromFile(FilePath.TRANSLATIONS);

    const tr = transactions.filter((t) => t.id !== id);

    saveToFile(FilePath.TRANSLATIONS, tr);

    console.log(tr);
  };
}

module.exports = TransactionRepository;
