const express = require('express');

function products ( connection ) {
    const router = express.Router();
    router.get('/products', (req, res, next) => {
        let query = 'SELECT products.id, products.product_name, products.price, products.short_description, \
                    (SELECT image_url FROM \`images\` \
                    WHERE p_id = products.id LIMIT 1) \
                    AS image FROM \`products\`';
        connection.query(query, (err, result) => {
            if (err) return next(err);
            res.status(200).json({
                'products': result
            });
        })
    });
};