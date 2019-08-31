const express = require('express');

function cart(connection) {
    const router = express.Router();
    router.post('/cart', (req, res, next) =>  {
        if (!req.query.productId || !req.query.quantity) {
            return res.status(400).send({
                errors: ['no productId and/or quantity provided'],
                queryObject: [req.query]
            });
        }
        const { productId, quantity } = req.query;
        let query = 'INSERT INTO \`cart\` (p_id, quantity, time_added) \
                        VALUES (?, ?, NOW())';
        let insert = [productId, quantity];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            const output = {
                success: true,
                data: result
            };
            res.json(output);
        });
    });
    router.get('/cart', (req, res, next) => {
        let query = 'SELECT * FROM \`cart\` WHERE cart_id = ?';
        let insert = [req.query.cartId];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            const output = {
                success: true,
                data: result
            };
            res.json(output);
        });
    });
    router.post('/update-cart', (req, res, next) => {
        const { cartId, productId, quantity } = req.query;
        if (!cartId || !productId || !quantity) {
            res.status(400).send({
                errors: ['no cart id, product id, and/or quantity provided']
            });
        };
        let query = 'UPDATE `cart` \
                        SET p_id = ?, \
                            quantity = ?, \
                            time_updated = NOW() \
                        WHERE \`cart\`.\`cart_id\` = ?';
        let insert = [productId, quantity, cartId];
        connection.query(query, insert, (err, result) => {
            if (err) return next(err);
            res.status(200).json({
                data: result
            });
        });
    });
    return router;
};

module.exports = cart;





