const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
apiRouter = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;
const multer = require('multer');


const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10mb" }));


app.use('/public', express.static('public'));

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


mongoose
  .connect("mongodb+srv://vedantassignment05:6WvnqW1KQkpXfTqc@digitalflake.tc9cx1b.mongodb.net/?retryWrites=true&w=majority&appName=digitalflake")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });



const userRoute = require("./src/routes/userRoute");
const category = require("./src/routes/Category");
const product = require("./src/routes/Product");
apiRouter.use("/users", userRoute);
apiRouter.use("/category", category);
apiRouter.use("/products", product);

app.use("/api", apiRouter);






app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});