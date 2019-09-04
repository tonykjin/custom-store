const express = require('express');

function products(connection) {
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
        });
    });
    router.get('/product-details', (req, res, next) => {
        if(!req.query.id) {
            return res.status(400).send({
                errors: ['no id provided']
            });
        };
        const id = req.query.id;
        let query = 'SELECT p.id, p.product_name, p.price, p.short_description, \
                        GROUP_CONCAT(i.image_url) AS images \
                        FROM `products` AS p \
                        JOIN `images` AS i \
                        ON p.id = i.p_id \
                        WHERE p.id = ?\
                    GROUP BY p.id';
        let insert = [id];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            res.json({
                'product-details': result
            });
        });
    });
    return router;
};

module.exports = products;