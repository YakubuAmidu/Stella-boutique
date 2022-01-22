const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = OrderItem = mongoose.model('OrderItem', OrderItemSchema);