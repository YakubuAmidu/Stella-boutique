const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
 try {
    const orderList = await Order.find();

    if(!orderList){
      return res.status(500).json({ success: false });
    }
 } catch(err) {
   console.error(err.message);
 }

    res.send(orderList);
});

module.exports = router;