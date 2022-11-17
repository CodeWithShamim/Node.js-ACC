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

// Schema => Model => Query 

// schema 
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
  // supplier: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Supplier"
  // },
  // categories: [{
  //   _id: mongoose.Schema.Types.ObjectId,
  //   name: {
  //     type: String,
  //     required: true
  //   }
  // }]

}, { timestamps: true })

// mongoose middlewares => pre - post
productSchema.pre("save", function (next) {
  // console.log("Before saving data.");
  // this=>
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next()
})
productSchema.post("save", function (doc, next) {
  // console.log("after saving data.");
  next()
})

// instance methods
productSchema.methods.logger = function () {
  console.log(`Pruduct save for this ${this.name}`);
}

// Model 
const Product = mongoose.model("Product", productSchema);

// route 
app.get("/", (req, res) => {
  res.send("ok")
})

// posting to database 
app.post("/api/v1/product", async (req, res) => {
  // save a product 
  try {
    const data = req.body;
    const product = new Product(data);
    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // }
    product.logger()

    const result = await product.save();
    // const result = await Product.create(data);
    res.status(200).json({
      success: true,
      message: "product inserted successfully.",
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "data is not inserted.",
      error: error.message
    })
  }
})

// get products 
app.get("/api/v1/product", async (req, res) => {
  try {
    // const products = await Product.find({_id:"63761e21af65ea0c70ba3eb8"});
    // const products = await Product.find({status:"in-stock"});
    // const products = await Product.find({ $or: [{ _id: "63761e21af65ea0c70ba3eb8" }, { name: "dkjsdl" }] });
    // const products = await Product.find({ status: { $ne: "out-of-stock" } });
    // const products = await Product.find({ name: { $in: ["mobile", "s5t24"] } });

    // const products = await Product.find({}, "name quantity");
    // const products = await Product.find({}, "-createdAt -updatedAt -_id -__v");
    // const products = await Product.find().select({ name: 1 });

    // const products = await Product.find().sort({ price: 1 });
    // const products = await Product.findById("63761e21af65ea0c70ba3eb8");

    const products = await Product
      .where("status").equals("out-of-stock")
      .where("price").gt(1).lt(100)
      .limit(2).sort({ quantity: 1 })

    res.status(200).json({
      success: true,
      data: products
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can't get the data.",
      error: error.message
    })
  }
})

// server
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

