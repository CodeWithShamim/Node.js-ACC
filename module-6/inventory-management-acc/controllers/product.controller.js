const Product = require("../models/Product")

// get product 
module.exports.getProduct = async (req, res) => {
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

        // const products = await Product
        //     .where("status").equals("out-of-stock")
        //     .where("price").gt(1).lt(100)
        //     .limit(2).sort({ quantity: 1 })

        const products = await Product.find({});



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
}

// create product 
module.exports.createProduct = async (req, res) => {
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
}