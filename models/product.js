const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    images: [
        {
            type: String
        }
    ],
    brand: {
        type: String,
        default: '',
    },
    price: {
       type: Number,
       default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    rating: {
        type: String,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Product = mongoose.model('Product', ProductSchema);