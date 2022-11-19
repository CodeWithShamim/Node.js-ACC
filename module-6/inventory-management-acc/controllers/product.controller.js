const productService = require("../services/product.service")

// get product 
module.exports.getProduct = async (req, res) => {
    // http://localhost:5000/api/v1/product?status=out-of-stock&page=1&limit=5&sort=price,name&fields=name,-_id //acending sort
    // http://localhost:5000/api/v1/product?status=out-of-stock&page=1&limit=5&sort=-price,-name&fields=name,-_id //decending sort

    // http://localhost:5000/api/v1/product?price[gt]=20

    try {
        let filters = { ...req.query };
        const excludeFields = ["page", "limit", "sort", "fields"]
        excludeFields.forEach(field => delete filters[field]);

        // filter by operator
        // http://localhost:5000/api/v1/product?price[gt]=20
        let filtersStringify = JSON.stringify(filters);
        filtersStringify = filtersStringify.replace(/\b(lt|lte|gt|gte|ne)\b/g, matching => `$${matching}`);
        filters = JSON.parse(filtersStringify);

        const queries = {}
        // for sort 
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            queries.sortBy = sortBy;
        }
        // for fields 
        if (req.query.sort) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }

        const products = await productService.getProductService(filters, queries);
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