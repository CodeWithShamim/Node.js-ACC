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

// schema design 
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this product."],
    unique: [true, "product name must be unique."],
    minLength: [3, "Product name must be at least 3 characters."],
    maxLength: [100, "Product name is too large."],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Name can't be negative."]
  },
  unit: {
    type: String,
    required: true,
    enum: {
      values: ["kg", "litre", "pcs"],
      message: "Unit value can't be {VALUE}. must be kg/litre/pcs"
    }

  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity can't be negative"],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        isInteger ? true : false
      }
    },
    message: "Quantity must be an integer."
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stock", "out-of-stock", "discontinued"],
      message: "status can't be {VALUE}"
    }
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now
  // },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier"
  },
  categories: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    }
  }]

}, { timestamps: true })

// route 
app.get("/", (req, res) => {
  res.send("ok")
})

// server
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

