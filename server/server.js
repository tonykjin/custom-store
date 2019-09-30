const express = require('express');
require('dotenv').config();

const path = require('path');
const PORT = process.env.PORT || 3001;

const products = require('./endpoints/products.js');
const cart = require('./endpoints/cart.js');

const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const db = pool.promise();

const app = express();
const session = require('cookie-session');

app.set('trust proxy', 1);
app.use(session({
    name: 'session',
    secret: process.env.SESSION_SECRET
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', products(db));
app.use('/api', cart(db));

app.use((err, req, res, next) => {
    res.sendStatus(500);
    console.error(err);
    if (err.fatal) {
        process.exit(1);
    }
});
app.listen(PORT, () => {
    console.log(`started server on port ${PORT}`);
});

