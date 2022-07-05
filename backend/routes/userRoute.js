const express = require('express');
const { getUserDetails, registerUser } = require('../controllers/userController');
const router = express.Router();

router.get('/:email',getUserDetails);
router.post('/register',registerUser);

module.exports = router