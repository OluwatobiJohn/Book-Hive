const { body, check } = require('express-validator');

const postBookVal = [
    body('title', 'Book Title is required').notEmpty(),
    body('title').isLength({min: 5, max: 50}).withMessage('Book Title must be between 5-50 characters'),
    body('author', 'Author name is required').notEmpty(),
    body('author').isLength({min: 5, max: 50}).withMessage('Author name must be between 5-50 characters'),
    check('cover', 'Cover Image is required').notEmpty(),
    body('publisher', 'Publisher name is required').notEmpty(),
    body('publisher').isLength({min: 5, max: 50}).withMessage('Publisher name must be between 5-50 characters')
];



module.exports = {
    postBookVal
};