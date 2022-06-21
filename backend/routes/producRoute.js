const express = require('express');
const { getAllProducts } = require('../controllers/productController');
const router = express.Router();

//Route imports
router.route('/products').get(getAllProducts);


module.exports = router;