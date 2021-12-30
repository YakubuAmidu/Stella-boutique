const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
   },
   image: {
       type: String,
       required: true,
   },
   countInStock: {
       type: Number,
       required: true
   },
   date: {
       type: Date,
       default: Date.now,
   }
});

module.exports = Product = mongoose.model('product', ProductSchema);