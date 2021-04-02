const router = require('express').Router();
const private = require('./verifyToken');

router.get('/', private, (req, res) => {
    res.json({posts : {
        title : "demo post",
        description : "this is first post"
    }});
});
module.exports = router;