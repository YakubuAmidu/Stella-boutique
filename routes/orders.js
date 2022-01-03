const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.get(`/`, async function(req, res){
    const order = await Order.find();

    if(!order){
        res.status(500).json({ success: false });
    }

    res.send(order);
});

module.exports = router;