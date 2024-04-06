

const express = require('express')
const router = express.Router();
const newProduct = require('../models/Product')


const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


router.get("/", async (req, res) => {
    try {
      const product = await newProduct.find();
      res.json(product);
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.post("/", upload.single('image'), async (req, res) => {
    try {

      if (req.file) {
        const publicUrl = `https://digitalflakeassignment-backend.onrender.com/public/uploads/${req.file.originalname}`;
         
        const imageData = new newProduct({
          filename: req.file.originalname,
          path: req.file.path,
          product_img: publicUrl,
          category : req.body.category,
          product : req.body.product,
          packSize : req.body.packSize,
          mrp : req.body.mrp,
          status : req.body.status,
      
        });
  
        await imageData.save();
        res.status(201).json(imageData);
      } else {
        res.status(400).json({ error: 'No file uploaded' });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal server error"});
    }
  });

  // Delete a product
router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
      const deletedproduct = await newProduct.findByIdAndDelete(productId);
      if (!deletedproduct) {
          return res.status(404).json({ message: "product not found" });
      }
      res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Update a Product
router.patch("/:id", async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;
  try {
      const updatedProduct = await newProduct.findByIdAndUpdate(productId, updates, { new: true });
      if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
  

  module.exports = router