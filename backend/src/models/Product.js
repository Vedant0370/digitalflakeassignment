

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  filename: String,
  path: String,
  product_img: String,
  category : String,
  product : String,
  packSize : String,
  mrp : Number,
  status : String,

  
 

 
});

const newProduct = mongoose.model('productimage', productSchema);

module.exports = newProduct;

