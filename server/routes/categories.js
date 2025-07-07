const express = require("express");
const router = express.Router();
const { writeFile, readFile } = require("node:fs/promises");
const crypto = require("node:crypto");

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
      JSON.stringify(categoriesDb, null, 2),
    );

    res.json(newCategory);
  } catch (err) {
    console.error("Error writing to db.categories.json:", err);
    return res.status(500).json({ error: "Failed to write/read category" });
  }
});

router.get("/", async (_req, res) => {
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

router.delete("/:id", async (req, res) => {
  console.log("Received request to delete category");
  try {
    const { id } = req.params;

    console.log("Deleting category with ID:", id);

    const categoriesRow =
      (await readFile("db.categories.json", "utf-8")) || "[]";
    let categoriesDb = JSON.parse(categoriesRow);

    const categoryIndex = categoriesDb.findIndex(
      (category) => category.id === id,
    );

    if (categoryIndex === -1) {
      return res.status(404).json({ error: "Category not found" });
    }

    categoriesDb.splice(categoryIndex, 1);

    await writeFile(
      "db.categories.json",
      JSON.stringify(categoriesDb, null, 2),
    );

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    return res.status(500).json({ error: "Failed to delete category" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = req.body;

    const categoriesRow =
      (await readFile("db.categories.json", "utf-8")) || "[]";
    let categoriesDb = JSON.parse(categoriesRow);

    const categoryIndex = categoriesDb.findIndex(
      (category) => category.id === id,
    );

    if (categoryIndex === -1) {
      return res.status(404).json({ error: "Category not found" });
    }

    categoriesDb[categoryIndex] = {
      ...categoriesDb[categoryIndex],
      ...updatedCategory,
    };

    await writeFile(
      "db.categories.json",
      JSON.stringify(categoriesDb, null, 2),
    );

    return res.status(200).json(categoriesDb[categoryIndex]);
  } catch (err) {
    console.error("Error updating category:", err);
    return res.status(500).json({ error: "Failed to update category" });
  }
});

module.exports = router;
