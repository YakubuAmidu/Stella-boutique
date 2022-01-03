const express = require('express');
const Category = require('../models/category');
const router = express.Router();

router.get(`/`, async function(req, res){
    const category = await Category.find();

    if(!category){
        res.status(500).json({ success: false });
    }

    res.send(category);
});

module.exports = router;