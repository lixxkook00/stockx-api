'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

exports.Register = (req, res) => {
    console.log("validation success !!!")

    let sql = ` INSERT INTO users ( username, wallet, full_name, password, email, phone) VALUES ( 
        '${req.body.userName}' , 
        '${req.body.wallet }' , 
        '${req.body.fullName }' , 
        '${req.body.password }' , 
        '${req.body.email }' , 
        '${req.body.phone }' 
    )`
    
    console.log("sql",sql)

    db.query(
            sql , 
            // [
            //     req.body.userName,
            //     req.body.fullName ,
            //     req.body.password ,
            //     req.body.email ,
            //     req.body.phone ,
            // ] , 
            (err, response) => 
        {
            if (err) {
                return res.status(500).json({
                    success: false,
                    msg: (err.code == 'ER_DUP_ENTRY' || err.errno == 1062) ? "Username already exists!" : "Unknown error",
                    position: "userName",
                });
            }

            if(response !== ""){
                res.json({
                    "status":200,
                    "msg":"Register Success",
                    // "data":response
                })
            }else{
                res.json({
                    "status":false,
                    "msg":"Server error",
                    "data":[]
                })
            }
        }
    )
}

exports.GetUser = (req, res) => {
    let sql = `SELECT * FROM users WHERE id = ${(req.body.userId).toString()}`;
    db.query(sql, (err, response) => {
        // console.log("response",response.length)
        if (err) throw err

        if(response.length === 1){
            res.json({
                "status":true,
                "msg":"Get user infor successfull",
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

exports.GetUserByWallet = (req, res) => {
    let sql = `SELECT * FROM users WHERE wallet = '${req.body.wallet}'`
    db.query(sql, (err, response) => {
        // console.log("sql",sql);
        // console.log("response",response.length)
        if (err) throw err

        if(response.length === 1){
            res.json({
                "status":true,
                "msg":"Get user info by wallet successfull",
                "data":response
            })
        }else{
            res.json({
                "status":false,
                "msg":"This is new wallet",
                "data":[]
            })
        }
    })
}