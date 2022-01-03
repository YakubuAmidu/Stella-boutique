const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    countInStock: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    }
});

exports.Product = mongoose.model('Product', productSchema);