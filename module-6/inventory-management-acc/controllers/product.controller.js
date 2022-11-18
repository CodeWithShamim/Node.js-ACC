const productService = require("../services/product.service")

// get product 
module.exports.getProduct = async (req, res) => {
    try {
        const products = await productService.getProductService();
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
    try {
        const data = req.body;
        const result = await productService.createProductService(data);
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

// update product 
module.exports.updateProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await productService.updateProductService(id, data);
        res.status(200).json({
            success: true,
            message: "product update successfully.",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "data update failed.",
            error: error.message
        })
    }
}