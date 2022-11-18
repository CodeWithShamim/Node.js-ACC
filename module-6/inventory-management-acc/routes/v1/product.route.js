const express = require("express");
const productController = require("../../controllers/product.controller");
const router = express.Router();

router.route("/bulk-update").patch(productController.bulkUpdateProduct)
router.route("/:id").patch(productController.updateProductById)

router.route("/")
    .get(productController.getProduct)
    .post(productController.createProduct)



module.exports = router;