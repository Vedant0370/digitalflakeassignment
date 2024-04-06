// const mongoose = require("mongoose");
const mongoose = require("mongoose");

const UserAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxLength: 100,
        validate: {
      validator: function (v) {
        // You can use a regex or any other method for email validation
        return /\S+@\S+\.\S+/.test(v);
      },
      message: "Please enter a valid email address",
    },
  },
  
   password: {
     type: String,
     required: true,
     minLength: 6, 
     maxLength: 100,
   },
 


});

const userAuth = mongoose.model("user", UserAuthSchema);
module.exports = userAuth;





