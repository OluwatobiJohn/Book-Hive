const cloudinary = require('../utils/cloudinary');
const DB = require('../config/db.config')



const postBook = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        
        //create book instance
        const book = {
            title: req.body.title,
            author: req.body.author,
            cover: result.secure_url,
            publisher: req.body.publisher,
        };
        let sql = 'INSERT INTO books SET ?';
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


module.exports = {
    postBook
};