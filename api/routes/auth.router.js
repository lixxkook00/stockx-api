'use strict';
const express = require('express'); 

const { validationResult } = require('express-validator');

const authController = require('../controllers/auth.controller')
const validation = require('../valiadations')

const router = express.Router(); 

router.post('/register',authController.Register);

router.post('/get-user',authController.GetUser);

router.post('/get-user',authController.GetUser);

module.exports = router;