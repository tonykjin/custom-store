const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const path = require('path');
const PORT = process.env.PORT || 3001;

//const require endpoint files here;

const mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use() //endpoints here

app.use((err, req, res, next) => {
    res.sendStatus(500);
    console.error(err);
    if (err.fatal) {
        process.exit(1);
    }
});
app.listen(PORT, () => {
    console.log(`started server on port ${PORT}`);
})