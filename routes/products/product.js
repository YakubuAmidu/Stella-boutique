const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

router.get('/', (req, res) => {
    res.send('Product routes');
})

module.exports = router;