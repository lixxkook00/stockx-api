const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;

const productRouter = require('./api/routes/product.router')
const authRouter = require('./api/routes/auth.router')


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

// Router
app.use('/product', productRouter);
app.use('/auth', authRouter);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})


// listen on enviroment
app.listen(port, () => console.log('port listen hereeeeeee', port))
