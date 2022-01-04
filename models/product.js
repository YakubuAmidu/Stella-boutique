const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String,
    },
    countInStock: {
        type: Number,
        required: true
    }
});

module.exports = Product = mongoose.model('Product', ProductSchema);