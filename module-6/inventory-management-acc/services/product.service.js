const Product = require("../models/Product");


// get all products 
module.exports.getProductService = async (filters, queries) => {
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

    const products = await Product.find(filters)
        .select(queries.fields)
        .sort(queries.sortBy)// sort("name price")
        .skip(queries.skip)
        .limit(queries.limit)

    const totalProducts = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalProducts / queries.limit)

    return { totalProducts, totalPages, products };
}

// post a new product 
module.exports.createProductService = async (data) => {
    const product = new Product(data);
    product.logger()
    const result = await product.save();
    // const result = await Product.create(data);
    return result;
}

// update a product 
module.exports.updateProductByIdService = async (productId, data) => {
    // step-1 =>
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();

    // step-2 => 
    // const result = await Product.updateOne({ _id: productId }, { $inc: { price: 100 } }, { runValidators: true })
    const result = await Product.updateOne({ _id: productId }, { $set: data }, { runValidators: true })
    return result;
}

// update multiple products 
module.exports.bulkUpdateProductService = async (data) => {
    /*
        // json data for this update 
        {
            "ids": [
                "6376320a27615e099803f1e1",
                "6376321b27615e099803f1e3"
            ],
                "data": {
                "description": "bulk-update2"
            }
        }
    */
    // const result = await Product.updateMany({ _id: data.ids }, { $set: data.data }, { runValidators: true })

    /*
         // json data for this update 
        {
            "ids": [
                {
                    "id": "6376320a27615e099803f1e1",
                    "data": {
                        "name": "mobile",
                        "description": "bulk1 update by promise"
                    }
                },
                {
                    "id": "6376321b27615e099803f1e3",
                    "data": {
                        "name": "T-shirts",
                        "description": "bulk100 update by promise"
                    }
                }
            ]
        }
    */

    const products = []
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data))
    });
    const result = await Promise.all(products)
    return result;
}

// delete a product 
module.exports.deleteProductByIdService = async (productId) => {
    const result = await Product.deleteOne({ _id: productId })
    return result;
}

// bulk delete product 
module.exports.bulkDeleteProductService = async (productIds) => {
    // const result = await Product.deleteMany({}) // delete all data from db
    const result = await Product.deleteMany({ _id: productIds })
    return result;
}