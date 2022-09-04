const { check, body } = require('express-validator');

// product
exports.createProduct = [
    check('name', 'Name product is requied').not().isEmpty(),
]