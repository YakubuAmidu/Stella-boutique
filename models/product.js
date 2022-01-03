const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
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
});

exports.exports = Product = mongoose.model('Product', productSchema);