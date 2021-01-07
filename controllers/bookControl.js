const cloudinary = require('../utils/cloudinary');
const DB = require('../config/db.config');
const { validationResult } = require('express-validator')




const postBook = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        console.log(result);
        //create book instance
        const book = {
            title: req.body.title,
            author: req.body.author,
            cover: result.secure_url,
            publisher: req.body.publisher,
        };
        let sql = 'INSERT INTO books SET ?';
        //post new book validation check
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
           return res.status(400).send({errors: errors.array()});
        };
        //save book
        DB.query(sql, book, (err, results) => {
            if (err) throw err;
            console.log(results);
            res.json({message: 'New Book', book: book});
        });
    }
    catch(err) {
        console.log(err)
    }
}

const allBooks = async (req, res) => {
    let sql = 'SELECT * FROM books'
    try {
        DB.query(sql, (err, results) => {
            if (err) throw err;
            console.log(results);
            res.json({message: 'All Books', book: results})
        })
    }
    catch(err) {
        console.log('error:', err)
    }
}
module.exports = {
    postBook,
    allBooks
};