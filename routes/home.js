const express = require('express');
const router = express.Router();
const DB = require('../config/db.config');




router.get('/', (req, res) => {
    let sql = 'create table if not exists Books(bookID int auto_increment, title varchar(50), author varchar(50), cover varchar(250), publisher varchar(50), date datetime default now(), primary key(bookID));'
    DB.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('You can Add Books');
    });
});

module.exports = router;