const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

router.get('/', async (req, res) => {
    const orderList = await Order.find();

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

router.post('/', async (req, res) => {
  

    try{

    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;