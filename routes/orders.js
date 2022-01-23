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

router.post('/', async (req, res) => {
    try {
        const { orderItems, shippingAddress1, shippingAddress2, phone, city, country, zip, status, totalPrice } = req.body;
        
        let order = new Order({
            orderItems,
            shippingAddress1,
            shippingAddress2,
            phone,
            city,
            country,
            zip,
            status,
            totalPrice
        });

        order = await order.save();

    } catch(err) {
      console.error(err.message);
    }
})

module.exports = router;