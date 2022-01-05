const express = require('express');
const router = express.Router();

const Category = require('../models/category');

router.get('/', async (req, res) => {
    try {
       const categoryList = await Category.find();

       if(!categoryList){
           return res.status(500).json({ success: false });
       }

       res.status(200).send(categoryList);
    } catch (err) {
      console.error(err.message);
    }
 });

 router.get('/:id', async (req, res) => {
     try {
        const category = await Category.findById(req.params.id);

        if(!category){
            return res.status(500).json({ success: false, message: 'The category with the given ID was not found' });
        }

         res.status(200).send(category);
         console.log(category);
     } catch(err) {
         console.error(err.message);
     }
 });

 router.put('/:id', async (req, res) => {
     try {
         const category = await Category.findByIdAndUpdate(req.params.id, {
           name: req.body.name,
           icon: req.body.icon,
           color: req.body.color
         }, 
         {
             new: true
         }
         );
  
       if(!category){
           return res.status(400).json({ success: false, message: 'The category cannot be created!' });
       }

       res.send(category);
       console.log(category);
     } catch (err) {
         console.error(err.message);
     }
 });

router.post('/', async (req, res) => {
    try {
       let category = new Category({
           name: req.body.name,
           icon: req.body.icon,
           color: req.body.color
       });

       category = await category.save();

       if(!category){
           return res.status(404).send('The category cannot be created!');
       }

       res.send(category);
       console.log(category);
    } catch (err) {
      console.error(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
       const category = await Category.findByIdAndRemove(req.params.id);

       if(category){
           return res.status(200).json({ success: true, message: 'The category have been deleted!' });
       } else {
           return res.status(400).json({ success: false, message: 'The category cannot be found!' });
       }

    } catch (err){
       console.error(err.message);
    }
});

module.exports = router;