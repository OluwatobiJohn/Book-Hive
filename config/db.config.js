const mySQL = require('mysql');
require('dotenv/config');

let connect = mySQL.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "book"
});


module.exports = connect;