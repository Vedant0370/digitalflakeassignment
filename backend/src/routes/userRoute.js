const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuth = require("../models/userModels");

const router = express.Router();
const jwtKey = "amar";



router.get("/", async (req, res) => {
    try {
      const employerAuth = await userAuth.find();
      res.status(200).json(employerAuth);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await userAuth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userAuth({
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


  router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const empAuth = await userAuth.findOne({ email });
  
      if (!empAuth) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const passwordMatch = await bcrypt.compare(password, empAuth.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
  
      const token = jwt.sign({ email: empAuth.email, userId: empAuth._id }, jwtKey);
  
      res.json({
        userId: empAuth._id,
        empName: empAuth.empName,
        email: empAuth.email,
        number: empAuth.number,
        token: token 
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  

  router.delete("/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const empAuth = await userAuth.findByIdAndDelete(id);
        res.status(200).json({ message: "Employer Delete Successfully" });
      } catch (e) {
        res.status(500).json({ error: "Something went wrong" });
      }
    });


  module.exports = router;
