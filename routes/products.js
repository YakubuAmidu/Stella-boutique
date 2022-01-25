const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const Product = require('../models/product');
const Category = require('../models/category');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
       cb(null, '/public/uploads');
    },
    filename: function(req, file, cb){
        const fileName = file.originalname.split(' ').join('-');
        cb(null, fileName + '-' + Date.now());
    }
});

const uploadOptions = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        let filter = {};

        if(req.query.categories){
           filter = { category: req.query.categories.split(', ')};
        }
        const productList = await Product.find(filter).populate('category');

        if(!productList) {
            return res.status(500).json({ success: false });
        } else {
            res.status(200).send(productList);
            console.log(productList);
        }
    } catch (err) {
       console.error(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');

        if(!product){
            return res.status(400).json({ success: false });
        } else {
            res.send(product);
            console.log(product);
        }
    } catch (err) {
      console.error(err.message);
    }
})

router.post('/', uploadOptions.single('image'), async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);

        if(!category){
            return res.status(400).send('Invalid category');
        }

        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get(('host'))}/public/uploads`;

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`, /* "http://localhost:3000/public/uploads/image-1234" */
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
        } else {
            res.send(product);
            console.log(product);
        }
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
        } else {
            res.status(200).send(product);
            console.log(product);
        }
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
    } else {
        res.status(200).send({
            productCount
        });
        console.log(productCount);
    }
   } catch(err) {
       console.error(err.message);
   }
});

router.get('/get/featured', async (req, res) => {
    try {
      const featuredProduct = await Product.find({ isFeatured: true });
      
      if(!featuredProduct){
          return res.status(500).json({ success: false });
      } else {
        res.status(200).send(featuredProduct);
        console.log(featuredProduct);
      }
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/get/featured/:count', async (req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0;
        const featuredProduct = await Product.find({ isFeatured: true }).limit(+count);

        if(!featuredProduct){
            return res.status(500).json({ success: false });
        } else {
            res.status(200).send(featuredProduct);
            console.log(featuredProduct);
        }
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;