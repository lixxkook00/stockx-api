const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: true}))

app.use(bodyParser.json());

let routes = require('./api/routes')
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

// listen on enviroment
app.listen(port, () => console.log('port listen hereeeeeee', port))
