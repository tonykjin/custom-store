const express = require('express');

function cart(connection) {
    const router = express.Router();

    router.post('/cart', async (req, res, next) =>  {
        try {
            if (!req.session.cartId) {
                let query = 'INSERT INTO `cart` (cart_id, time_added) VALUES (NULL, NOW())';
                const [result] = await connection.query(query);
                req.session.cartId = result.insertId;
            } else {
                const { productId, quantity } = req.query;
            let query = 'INSERT INTO `cart_items` (c_id, p_id, quantity) \
                            VALUES (?, ?, ?)';
            let insert = [req.session.cartId, productId, quantity];
            const [result] = await connection.query(query, insert);
            const output = {
                success: true,
                data: result
            };
            res.json(output);
            };
        } catch(err) {
            return next(err);
        };
    });
    router.get('/cart', async (req, res, next) => {
        try {
            let query = 'SELECT * FROM `cart` WHERE cart_id = ?';
            let insert = [req.query.cartId];
            const [result] = await connection.query(query, insert);
            const output = {
                success: true,
                data: result
            };
            res.json(output);
        } catch (err) {
            return next(err);
        }
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




