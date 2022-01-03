const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get(`/`, async function(req, res){
    const users = await User.find();

    if(!users){
        res.status(500).json({ success: false });
    }
    res.send(users);
});

module.exports = router;