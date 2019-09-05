const express = require('express');

function orders( connection ) {
    const router = express.Router();

    router.post('/order', async (req, res, next) => {
        try {
            const { address, zip, country } = req.query['user-details'];
            if (!address || !zip || !country) {
                return res.status(400).send({
                    errors: ['missing address, zip, and/or country']
                });
            };
            let query = 'INSERT INTO `customer` (id, address, zip, country, cart_id)\
                            VALUES (NULL, ?, ?, ?, ?)';
            let insert = [address, zip, country, req.session.cartId];
            const [ result ] = await connection.query(query, insert);
            res.json(result);
        } catch( err ) {
            return next(err);
        };
    });
    return router;
};

module.exports = orders;