const express = require('express');
const router = express.Router();

const Product = require('../models/product');

const api = process.env.API_URL;

router.get(`/`, async function(req, res){
   const productList = await Product.find();
   
   if(!productList){
       res.status(500).json({ success: false });
   }

   res.send(productList);
  });
  
  router.post(`/`, function(req, res){
      const product = new Product({
          name: req.body.name,
          image: req.body.image,
          countInStock: req.body.countInStock
      });
  
      product.save().then((SavedProduct) => {
          res.status(200).json(SavedProduct);
          console.log(SavedProduct);
      }).catch(err => {
          res.status(500).json({
              error: err,
              success: false
          });
      });
  });

  module.exports = router;