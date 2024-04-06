const express = require("express");
const router = express.Router();
const category = require("../models/Category")


router.get("/", async (req, res) => {
    try {
        const categories = await category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new category
router.post("/", async (req, res) => {
    const newCategory = new category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a category
router.delete("/:id", async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a category
router.patch("/:id", async (req, res) => {
    const categoryId = req.params.id;
    const updates = req.body;
    try {
        const updatedCategory = await category.findByIdAndUpdate(categoryId, updates, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

  module.exports = router