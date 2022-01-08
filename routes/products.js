const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
const Category = require('../models/category');

router.get('/', async (req, res) => {
    try {
        const productList = await Product.find().populate('category');

        if(!productList) {
            return res.status(500).json({ success: false });
        }
            
           res.status(200).send(productList);
           console.log(productList);
    } catch (err) {
       console.error(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');

        if(!product){
            return res.status(400).json({ success: false });
        }

        res.send(product);
        console.log(product);
    } catch (err) {
      console.error(err.message);
    }
})

router.post('/', async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);

        if(!category){
            return res.status(400).send('Invalid category');
        }

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        });

        product = await product.save();

        if(!product){
            return res.status(500).send('Product cannot be created!');
        }
        
        res.send(product);
        console.log(product);
    } catch (err) {
        console.error(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send('Invalid product ID');
        };

        const category = await Category.findById(req.body.category);

        if(!category){
            return res.status(400).send('Invalid category');
        }

        let product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        }, {
            new: true
        });
        
        if(!product){
            return res.status(400).send('The product cannot be updated!');
        }

        res.status(200).send(product);
        console.log(product);
    } catch (err) {
       console.error(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndRemove(req.params.id);

      if(product){
          return res.status(200).json({ success: true, message: 'The product have been deleted!' });
      } else {
        return res.status(400).json({ success: false, message: 'The product cannot be found!' });
      }

    } catch (err) {
        console.error(err.message);
    }
});

router.get('/get/count', async (req, res) => {
   try {
    const productCount = await Product.countDocuments();

    if(!productCount){
        return res.status(500).json({ success: false });
    }

    res.status(200).send({
        productCount
    });
    console.log(productCount);
   } catch(err) {
       console.error(err.message);
   }
});

module.exports = router;