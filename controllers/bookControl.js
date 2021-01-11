const cloudinary = require('../utils/cloudinary');
const DB = require('../config/db.config');
const { validationResult } = require('express-validator')

const searchBook = (req, res) => {
    let search = req.body.search;
    let sql = `SELECT * FROM books WHERE books.title or books.author LIKE '%${search}%'`;

    try {
        console.log(search)
        DB.query(sql, (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                res.json({message: 'search input does not match any books'})
            } else {
                res.json({message: `results with ${search} keyword`, result: result})
            }
        })
    }
    catch(err){
        console.log(err)
    }
}

const deleteBook = (req, res) => {
    let sql = `DELETE FROM books WHERE bookID = ${req.params.id}`;

    try {
        DB.query(sql, (err, result) => {
            if (err) throw err;

            if (result.affectedRows < 1) {
                res.json({message: 'Invalid ID, no book to delete'})
            } else {
                console.log(result);
                res.json({message: `Book with ID ${req.params.id} deleted`})
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}


const singleBook = (req, res) => {
    let sql = `SELECT * FROM books WHERE bookID = ${req.params.id}`
    try {
        DB.query(sql, (err, results) => {
            if (err) throw err;
            
            if (results[0] == null) {
                res.json({message: `Invalid Book ID`})
            }
            else if (results !== []) {
                res.json({message: `Book with ID ${req.params.id}`, book: results})
            }
        })
    } 
    catch(err) {
        console.log('error:', err)
    }
}


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
    searchBook,
    deleteBook,
    singleBook,
    postBook,
    allBooks
};