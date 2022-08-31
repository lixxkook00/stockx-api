'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

module.exports = {

    getAll: (req, res) => {
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

    ,findById: (req, res) => {
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

    ,filter: (req, res) => {

        let sql = 
            'SELECT * FROM `product` WHERE '
            + 
            `brand LIKE '%${req.body.brand !== undefined ? req.body.brand : ''}%'`
            +
            ` AND type LIKE '%${req.body.type !== undefined ? req.body.type : ''}%'`
            + 
            ` AND sizeNum LIKE '%${req.body.sizeNum !== undefined ? req.body.sizeNum : ''}%'`
            +
            ` AND sizeType LIKE '%${req.body.sizeType !== undefined ? req.body.sizeType : ''}%'`

        console.log("------ sql filter : \n",sql)
        
        db.query(sql, (err, response) => {
            if (err) throw err

            if(response.length > 0){
                res.json({
                    "status":200,
                    "msg":"Find product successfull",
                    "length":response.length,
                    "data":response
                })
            }else{
                res.json({
                    "status":false,
                    "msg":"Don't have this shit item",
                    "data":[]
                })
            }
        })
    }

    ,getAttributeDetail: (req, res) => {
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

    ,createProduct: (req, res) => {

        console.log(req.body.attributeList)
        
        let sql = 'INSERT INTO `product` (`productId`, `name`, `imgUrl`, `price`, `brand`, `ranking`, `type`, `sizeNum`, `sizeType`) VALUES (NULL, \"'+ req.body.name +'\", \"'+ req.body.imgUrl +'\", '+ req.body.price +', \"'+ req.body.brand +'\", '+ req.body.ranking +', \"'+ req.body.type +'\",\''+req.body.attributeList+'\',\''+req.body.attributeList+'\')'

        console.log("success getAttributeDetail with : ",sql)

        db.query(sql, (err, response) => {
            if (err) throw err

            if(response !== ""){
                res.json({
                    "status":200,
                    "msg":"Create products successfull",
                    "data":response
                })
            }else{
                res.json({
                    "status":false, 
                    "msg":"Catch this shit error in there !!!",
                    "data":[]
                })
            }
        })
    },
}