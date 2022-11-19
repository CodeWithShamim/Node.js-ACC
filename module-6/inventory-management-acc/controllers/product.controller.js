const productService = require("../services/product.service")

// get product 
module.exports.getProduct = async (req, res) => {
    try {
        const filters = {...req.query};
        const excludeFields = ["page", "limit", "sort"]
        excludeFields.forEach(field=> delete filters[field]);

        const products = await productService.getProductService(filters);
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
        const result = await productService.updateProductByIdService(id, data);
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

// bulk update product 
module.exports.bulkUpdateProduct = async (req, res) => {
    try {
        const data = req.body;
        const result = await productService.bulkUpdateProductService(data);
        res.status(200).json({
            success: true,
            message: "Bulk update successfully.",
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

// delete product 
module.exports.deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productService.deleteProductByIdService(id);
        res.status(200).json({
            success: true,
            message: "Product delete successfully.",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Product delete failed.",
            error: error.message
        })
    }
}

// bulk delete product 
module.exports.bulkDeleteProduct = async (req, res) => {
    try {
        const ids = req.body.ids;
        const result = await productService.bulkDeleteProductService(ids);
        res.status(200).json({
            success: true,
            message: "Bulk delete successfully.",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "bulk delete failed.",
            error: error.message
        })
    }
}