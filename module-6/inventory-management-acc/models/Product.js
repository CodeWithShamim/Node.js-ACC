const mongoose = require("mongoose");

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
        min: [0, "Price can't be negative."]
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

module.exports = Product;