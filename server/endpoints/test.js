const router = require('express').Router();

function testRoutes(){
    router.get('/count', (req, res) => {
        let count = req.session.count;

        if(!count){
            count = 1;
        } else {
            count++;
        }

        req.session.count = count;

        res.send({
            message: "Count the requests",
            count: req.session.count
        });
    });

    return router;
}

module.exports = testRoutes;
