'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

exports.getAll = (req, res) => {
    let sql = 'SELECT * from `product`'

    db.query(sql, (err, response) => {
        if (err) throw err

        res.json({
            "status":true,
            "msg":"Get product list successfull",
            "length":response.length,
            "data":response
        })
    })
}

exports.findById = (req, res) => {
    let sql = 'SELECT * FROM `product` WHERE productId = ' + req.body.productId
    db.query(sql, (err, response) => {
        if (err) throw err

        if(response !== ""){
            res.json({
                "status":200,
                "msg":"Find product successfull",
                "data":response
            })
        }else{
            res.json({
                "status":false,
                "msg":"Dont have this shit item",
                "data":[]
            })
        }
    })
}

exports.filter = (req, res) => {
    let sql = 
        'SELECT * FROM product WHERE '
        + 
        `brand LIKE '%${req.body.brand !== undefined ? req.body.brand : ''}%'`
        +
        ` AND type LIKE '%${req.body.type !== undefined ? req.body.type : ''}%'`
        + 
        ` AND sizeNum LIKE '%${req.body.sizeNum !== undefined ? req.body.sizeNum : ''}%'`
        +
        ` AND sizeType LIKE '%${req.body.sizeType !== undefined ? req.body.sizeType : ''}%'`
        +
        ` AND price >= '${req.body.priceMin !== undefined ? req.body.priceMin : 0}'`
        +
        ` AND price <= '${req.body.priceMax !== undefined ? req.body.priceMax : 90000000}'`

    db.query(sql, (err, response) => {
        if (err) throw err

        if(response.length > 0){
            const finalList = [...response];

            console.log("finalList",finalList[0].price);

            // sort
            if(req.body.sort === "low"){
                finalList.sort(function(a, b){return a.price - b.price})

                res.json({
                    "status":200,
                    "msg":"Find product successfull",
                    "length":finalList.length,
                    "data":finalList
                })
            }
            else{
                res.json({
                    "status":200,
                    "msg":"Find product successfull",
                    "length":response.length,
                    "data":response
                })
            }

        }else{
            res.json({
                "status":false,
                "msg":"Don't have this shit item",
                "data":[]
            })
        }
    })
}

exports.getAttributeDetail = (req, res) => {
        let sql = 'SELECT * FROM `product_attribute_price` WHERE productId = ' + req.body.productId

        db.query(sql, (err, response) => {
            if (err) throw err

            if(response !== ""){
                res.json({
                    "status":200,
                    "msg":"Find products with attribute successfull",
                    "data":response
                })
            }else{
                res.json({
                    "status":false,
                    "msg":"Dont have this shit item",
                    "data":[]
                })
            }
        })
    }

exports.createProduct = (req, res) => {
    console.log(req.body.sizeAvailable)

    let sql = 
        `INSERT INTO product (productId, name, imgUrl, price, brand, ranking, type, sizeNum, sizeType)
            VALUES(
                NULL,
                '${req.body.name}', 
                '${req.body.imgUrl}', 
                ${req.body.price}, 
                '${req.body.brand}',  
                ${req.body.ranking}, 
                '${req.body.type}',
                '${req.body.sizeAvailable}',
                '${req.body.sizeType}')
        ` 

    db.query(sql, (err, response) => {
        if (err) throw err

        if(response !== ""){
            res.json({
                "status":200,
                "msg":"Create products successfull",
                "data":[]
            })
        }else{
            res.json({
                "status":false, 
                "msg":"Catch this shit error in there !!!",
                "data":[]
            })
        }
    })
}