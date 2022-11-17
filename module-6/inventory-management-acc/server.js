const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const colors = require("colors");
const productRoute = require("./routes/v1/product.route");
const database = require("./utils/database");


app.use(express.json());
app.use(cors());
database();

app.get("/", (req, res) => {
  res.send("ok")
})

// route
app.use("/api/v1/product", productRoute)

// server
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

