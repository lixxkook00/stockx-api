'use strict';

module.exports = function(app) {
    let productController = 
        require('./controllers/ProductController');

    // product
    app.route('/product/all')
        .post(productController.getAll);

    app.route('/product/detail')
        .post(productController.findById);

    app.route('/product/filter')
        .post(productController.filter);

    app.route('/product/attribute/detail')
        .post(productController.getAttributeDetail);

    app.route('/product/create')
        .post(productController.createProduct);
    
};