'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

exports.Register = (req, res) => {
    console.log("validation success !!!")

    let sql = ` INSERT INTO users ( username, full_name, password, email, phone) VALUES ( ? , ? , ? , ? , ? )`

    db.query(
            sql , 
            [
                req.body.userName,
                req.body.fullName ,
                req.body.password ,
                req.body.email ,
                req.body.phone ,
            ] , 
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
    let sql = `SELECT * FROM users WHERE id = ${req.body.userId}`
    db.query(sql, (err, response) => {
        console.log("response",response.length)
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