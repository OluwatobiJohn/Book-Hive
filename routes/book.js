const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const Books = require('../controllers/bookControl')

router.post('/', upload.single('cover'), Books.postBook)




module.exports = router;