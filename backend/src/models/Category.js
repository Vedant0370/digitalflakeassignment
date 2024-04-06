// const mongoose = require("mongoose");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  
  
   category_Name: {
     type: String,
     required: true,
    
   },
   category_Des: {
    type: String,
    required: true,
   
  },
  category_Status: {
    type: String,
    required: true,
   
  },
 


});

const category = mongoose.model("category", categorySchema);
module.exports = category;





