const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const Books = require('../controllers/bookControl')
const Validator = require('../middlewares/bookVal')

//search book
router.get('/search', Books.searchBook);

//delete book
router.delete('/:id', Books.deleteBook);

//add book
router.post('/', upload.single('cover'), Validator.postBookVal, Books.postBook);

//get all books
router.get('/', Books.allBooks);

//get book by id
router.get('/:id', Books.singleBook);




module.exports = router;