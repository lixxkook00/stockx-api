'use strict';
const express = require('express');
const { validationResult } = require('express-validator');

const productController = require('../controllers/ProductController');
const validation = require('../valiadations')

const router = express.Router(); 

// product
router.post('/all',productController.getAll);

router.post('/detail',productController.findById);

router.post('/filter',productController.filter);

router.post('/attribute/detail',productController.getAttributeDetail);

router.post('/create', 

    validation.createProduct,

    async (req,res,next) => {
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
            productController.createProduct(req,res)
        }
    }  
)


module.exports = router;