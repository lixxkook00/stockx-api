'use strict';
const express = require('express'); 

const { validationResult } = require('express-validator');

const authController = require('../controllers/auth.controller')
const validation = require('../valiadations')

const router = express.Router(); 

router.post('/register',authController.Register);

router.post('/get-user', 

    validation.getUserInfor,

    async (req,res) => {
        const errors = await validationResult(req);

        if (!errors.isEmpty()) {
            // console.log(errors)
            
            return res.status(422).json({
                status: false,
                msg: errors?.errors[0]?.msg,
                position: errors?.errors[0]?.param,
            })
        }
        else{
            authController.GetUser(req,res)
        }
    }  
)

module.exports = router;