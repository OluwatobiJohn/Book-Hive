const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const DB = require('./config/db.config')


//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Test Connection
DB.connect((err) => {
  if (err) throw err;
  console.log('SQL connected')
});

//Home route
const createTable = require('./routes/home');
app.use('/', createTable);

//Book route
const bookRoute = require('./routes/book');
app.use('/book', bookRoute)



app.listen('1500', () => {
    console.log('Server started on port 1500');
});