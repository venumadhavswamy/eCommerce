const express = require('express');
const { getUserDetails, registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.get('/:email',getUserDetails);
router.post('/register',registerUser);
router.post('/login',loginUser);

module.exports = router