'use strict';
const express = require('express'); 

const { validationResult } = require('express-validator');

const authController = require('../controllers/auth.controller')
const validation = require('../valiadations/valiadation')

const router = express.Router(); 

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

router.post('/get-user-by-wallet', 

    validation.getUserInforByWallet,

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
            authController.GetUserByWallet(req,res)
        }
    }  
)

router.post('/register', 

    validation.register,

    async (req,res) => {
        const errors = await validationResult(req);

        if (!errors.isEmpty()) {
            
            return res.status(422).json({
                status: false,
                msg: errors?.errors[0]?.msg,
                position: errors?.errors[0]?.param,
            })
        }
        else if(req.body.password !== req.body.rePassword){
            return res.status(422).json({
                status: false,
                msg: "Password does not match",
                position: "rePassword",
            })
        }
        else{
            authController.Register(req,res)
        }
    }  
)
module.exports = router;