const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

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
        const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
            let newOrderItems = new OrderItem({
              quantity: orderItem.quantity,
              product: orderItem.product
            });

            newOrderItems = await newOrderItems.save();

            return newOrderItems._id;
        }));
        
        const orderItemResolve = await orderItemsIds;
        console.log(orderItemResolve);

        const { orderItems, shippingAddress1, shippingAddress2, phone, city, country, zip, status, totalPrice } = req.body;

        let order = new Order({
            orderItems: orderItemResolve,
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

        if(!order){
            return res.status(400).json({ success: false, message: 'The order cannot be created!🚫'});
        }

        res.send(order);
        console.log(order);

    } catch(err) {
      console.error(err.message);
    }
})

module.exports = router;