const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const colors = require("colors");


app.use(express.json());
app.use(cors());

// database connection
mongoose.connect(process.env.DB_LOCAl)
  .then(() => console.log("DB connect success......".red.bold))
  .catch((error) => console.log("Error", error.message))

// route 
app.get("/", (req, res) => {
  res.send("ok")
})

// server
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

