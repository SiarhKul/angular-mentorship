const { writeFile, readFile } = require("node:fs/promises");

async function readFromFile(pathToFile) {
  try {
    const data = await readFile(pathToFile, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    throw new Error("Failed to read transactions database");
  }
}

async function saveToFile(pathToFile, transactions) {
  try {
    await writeFile(pathToFile, JSON.stringify(transactions, null, 2));
  } catch (error) {
    throw new Error("Failed to save transactions to database");
  }
}

module.exports = { readFromFile, saveToFile };
