const { check, body } = require('express-validator');

const 
    {
        onlyLettersAndNumbers,
        onlyLettersAndSpaces,
        checkerPassword
    }  
    = require('./checkerRegex')

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

exports.getProductById = [
    check('productId', 'Product ID is requied').notEmpty(),
]

// *** AUTH ***


// get infor user
exports.getUserInfor = [
    check('userId', 'User ID is requied').notEmpty(),
    check('userId', 'Invalid user id').isInt({ min: 1 }),
]

// register
exports.register = [
    check('userName')
        .notEmpty().trim().withMessage('Username is requied')
        .trim().isLength({ min: 6 }).withMessage('Username at least 6 characters long')
        .custom(value => {
            return new Promise((resolve, reject) => {
                if(!onlyLettersAndNumbers(value)){
                    return reject('Username have special characters');
                }
                return resolve()
            })
        })
        .not().isInt().withMessage("Username need at least 1 character"),

    check('fullName')
        .notEmpty().trim().withMessage('Full name is requied')
        // .trim().isLength({ min: 6 }).withMessage('Full name at least 6 characters long')
        .custom(value => {
            return new Promise((resolve, reject) => {
                if(!onlyLettersAndSpaces(value)){
                    return reject('Full name have special characters');
                }
                return resolve()
            })
        }),

    check('password')
        .notEmpty().trim().withMessage('Password is requied')
        .trim().isLength({ min: 6 }).withMessage('Password at least 6 characters long')
        .custom(value => {
            return new Promise((resolve, reject) => {
                if(!checkerPassword(value)){
                    return reject('Password must include uppercase, lowercase, number and special character');
                }
                return resolve()
            })
        })
    
    ,check('rePassword')
        .notEmpty().trim().withMessage('Confirm password is requied')
]