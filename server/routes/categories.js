const express = require("express");
const router = express.Router();
const { writeFile, readFile } = require("node:fs/promises");
const crypto = require("node:crypto");
const { read } = require("node:fs");

router.post("/", async (req, res) => {
  try {
    const id = crypto.randomUUID();
    const newCategory = { id, ...req.body };

    const categoriesRow =
      (await readFile("db.categories.json", "utf-8")) || "[]";
    console.log("Existing categories loaded:", categoriesRow);

    const categoriesDb = JSON.parse(categoriesRow);
    console.log("Parsed categories:", categoriesDb);

    categoriesDb.push(newCategory);

    await writeFile(
      "db.categories.json",
      JSON.stringify(categoriesDb, null, 2)
    );

    res.json(newCategory);
  } catch (err) {
    console.error("Error writing to db.categories.json:", err);
    return res.status(500).json({ error: "Failed to write/read category" });
  }
});

router.get("/", async (req, res) => {
  try {
    const categoryString =
      (await readFile("db.categories.json", "utf-8")) || "[]";
    const categories = JSON.parse(categoryString);
    return res.json(categories);
  } catch (err) {
    console.error("Error reading categories:", err);
    return res.status(500).json({ error: "Failed to read categories" });
  }
});

module.exports = router;
