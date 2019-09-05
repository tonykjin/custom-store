const express = require('express');

function products(connection) {
    const router = express.Router();

    router.get('/products', async (req, res, next) => {
        try {
            let query = 'SELECT products.id, products.product_name, products.price, products.short_description, \
                    (SELECT image_url FROM \`images\` \
                    WHERE p_id = products.id LIMIT 1) \
                    AS image FROM \`products\`';
            const [ result ] = await connection.query(query);
            res.status(200).json({
                'products': result
            });
        } catch (err) {
            return next(err);
        }
    });
    router.get('/product-details', async (req, res, next) => {
        try {
            const { id } = req.query;
            if(!id) {
                return res.status(400).send({
                    errors: ['no id provided']
                });
            };
            let query = 'SELECT p.id, p.product_name, p.price, p.short_description, \
                            GROUP_CONCAT(i.image_url) AS images \
                            FROM `products` AS p \
                            JOIN `images` AS i \
                            ON p.id = i.p_id \
                            WHERE p.id = ? \
                            GROUP BY p.id';
            let insert = [id];
            const [ result ] = await connection.query(query, insert);
            res.json({
                'product-details': result
            });
        } catch (err) {
            return next(err);
        };
    });
    return router;
};

module.exports = products;