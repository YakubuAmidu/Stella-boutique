const express = require('express');
const router = express.Router();

const Category = require('../models/category');

router.get('/', async (req, res) => {
    try {
       const categoryList = await Category.find();

       if(!categoryList){
           res.status(500).json({ success: false });
       }

       res.send(categoryList);
    } catch(err) {
      console.error(err.message);
    }
 });

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });

    category = await category.save();

    if(!category){
        return res.status(404).send('The category cannot be created!');
    };

    res.send(category);
    console.log(category);
});

router.delete('/:id', async (req, res) => {
    try {
       const category = await Category.findByIdAndRemove(req.params.id);

       if(category){
           return res.status(200).json({ success: true, message: 'The category have been deleted!' });
       } else {
           return res.status(400).json({ success: false, message: 'The category cannot be found!' });
       }

    }catch(err){
       return res.status(500).json({ success: false, error: err });
    }
});

module.exports = router;