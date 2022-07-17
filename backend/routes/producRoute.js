const express = require('express');
const { getAllProducts, createProduct, updateProduct,
    deleteProduct, getProductDetails } = require('../controllers/productController');
const isAuthenticatedUser = require('../middleware/authentication');
const router = express.Router();

//Route imports
router.route('/')
    .get(isAuthenticatedUser,getAllProducts);
router.route('/new')
    .post(createProduct);
router.route('/:id')
    .put(updateProduct)
    .delete(deleteProduct)
    .get(getProductDetails);
//Authentication middleware

module.exports = router;