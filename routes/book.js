const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const Books = require('../controllers/bookControl')
const Validator = require('../middlewares/bookVal')

router.post('/', upload.single('cover'), Validator.postBookVal, Books.postBook);

router.get('/', Books.allBooks);




module.exports = router;