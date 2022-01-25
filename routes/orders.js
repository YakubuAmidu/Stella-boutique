const express = require('express');
const order = require('../models/order');
const router = express.Router();
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const user = require('../models/user');

router.get('/', async (req, res) => {
    const orderList = await Order.find().populate('user').sort({'dateOrdered': -1 });

 try {
    if(!orderList){
      return res.status(500).json({ success: false });
    }
 } catch(err) {
   console.error(err.message);
 }

    res.send(orderList);
    console.log(orderList);
});

router.get('/:id', async (req, res) => {
    try {
    const order = await Order.findById(req.param.id)
    .populate('user').sort({'dateOrdered': -1 })
    .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } });

    if(!order){
        return res.status(400).json({ success: false });
    } else {
        res.send(order);
    }

    } catch(err) {
        console.error(err.message);
    }
})

router.post('/', async (req, res) => {

   try {
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItems) => {
        let newOrderItems = new OrderItem({
            quantity: orderItems.quantity,
            product: orderItems.product
        });

        newOrderItems = await newOrderItems.save();

        return newOrderItems._id;
    }));
    
    const orderItemsIdsResolved = await orderItemsIds;
    console.log(orderItemsIdsResolved);

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async orderItemId => {
      const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    }));

    const totalPriced = totalPrices.reduce((a, b) => a + b, 0);

    console.log(totalPrices);

    const { orderItems, shippingAddress1, shippingAddress2, city, country, zip, status, phone, totalPrice, user, } = req.body;

       let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1,
        shippingAddress2,
        city,
        country,
        zip,
        status,
        phone,
        totalPrice: totalPriced,
        user
       });

       order = await order.save();

       if(!order){
           return res.status(500).send('The order cannot be create!👎');
       } else {

       res.send(order);
       console.log(order);
       }

   } catch(err) {
      console.error(err.message);
   }

});

router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.param.id, 
        {
            status: req.body.status
        }, 
         { 
             new: true 
        }
        );

        if(!order){
            return res.status(400).send('The order cannot be update!');
        } else {
            return res.send(order);
        }
         
    } catch (err) {
        console.error(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.param.id);

        if(order){
           await order.orderItems.map(async (orderItem) => {
             await OrderItem.findByIdAndRemove(orderItem);
           });

            return res.status(200).json({ success: true, message: 'The order is delete!👍'});
        } else {
            return res.status(404).json({ success: false, message: 'The order is not found!👎'});
        }

    } catch (err) {
        console.error(err.message);
    }
});

router.get('/get/totalSales', async (req, res) => {
   try {
       const totalSales = await Order.aggregate([
           {
            $group: { _id: null, 
            totalSales: { $sum: '$totalPriced' }}
           }
       ]);

       if(!totalSales){
           return res.status(400).send('The order total sales cannot be generated!🚫');
       } else {
           res.send({ totalSales: totalSales.pop().totalSales });
       }

   } catch (err) {
       console.error(err.message);
   }
});

router.get('/get/count', async (req, res) => {
    try {
        const orderCount = await Order.countDocuments((count) => count);

        if(!orderCount){
          return res.status(500).json({ success: false });
        } else {
            res.send({
                orderCount: orderCount
            })
        }

    } catch (err) {
        console.error(err.message);
    }
});

router.get('/get/userorders/:userid', async (req, res) => {
    try {
        const userorderList = await Order.find({ user: req.params.userid }).populate({
            path: 'orderItems', populate: {
               path: 'product', populate: 'category'
            }
        }).sort({ 'dateOrdered': -1 });

        if(!userorderList){
            return res.status(500).json({ success: false });
        } else {
            res.send(userorderList);
        }

    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;