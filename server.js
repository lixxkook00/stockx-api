const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;

const productRouter = require('./api/routes/product.router')


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());
app.use(express.json());

// Router
app.use('/product', productRouter);



app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})


// listen on enviroment
app.listen(port, () => console.log('port listen hereeeeeee', port))
