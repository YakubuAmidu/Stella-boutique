const express = require('express');
const router = express.Router();

router.get(`/`, async function(req, res){
    res.send('Categories route');
});

module.exports = router;