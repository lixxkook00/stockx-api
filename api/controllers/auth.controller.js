'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')

exports.Register = (req, res) => {
    let sql = 'SELECT * FROM `users` WHERE is = ' + 1
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