const express = require('express');
const { getAllProducts, createProduct, updateProduct,
    deleteProduct, getProductDetails } = require('../controllers/productController');
const router = express.Router();

//Route imports
router.route('/')
    .get(getAllProducts);
router.route('/new')
    .post(createProduct);
router.route('/:id')
    .put(updateProduct)
    .delete(deleteProduct)
    .get(getProductDetails);


module.exports = router;