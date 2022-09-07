const { check, body } = require('express-validator');

// PRODUCT
exports.createProduct = [
    check('name', 'Product name is requied').notEmpty(),
    check('name', 'Product name must be smaller 255 character long').isLength({ max:254 }),

    check('imgUrl', 'Image of product is requied').notEmpty(),

    check('price', 'Price is requied').notEmpty(),
    check('price', 'Price is number').isFloat(),
    check('price', 'Price min is $0.01').isFloat({ min: 0.01 }),

    check('brand', 'Brand name product is requied').notEmpty(),
    check('name', 'Brand name must be smaller 255 character long').isLength({ max:254 }),

    check('ranking', 'Name product is requied').notEmpty(),

    check('type', 'Name product is requied').notEmpty(),

    check('sizeAvailable', 'Name product is requied').notEmpty(),
]

// AUTH

//  --- get infor user

exports.getUserInfor = [
    check('userId', 'User ID is requied').notEmpty(),
    check('userId', 'Invalid user id').isInt({ min: 1 }),
]