const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');
var multer = require('multer');
var upload = multer();

const app = express();
const port = process.env.PORT || 8080;

const productRouter = require('./api/routes/product.router')
const authRouter = require('./api/routes/auth.router')

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
}

app.use(cors(corsOpts));

// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Router
app.use('/product', productRouter);

app.use('/auth', authRouter);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})



// listen on enviroment
app.listen(port, () => console.log('port listen hereeeeeee', port))
