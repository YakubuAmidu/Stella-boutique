const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const userList = await User.find();

        if(!userList){
           res.status(500).json({ success: false });
        } else {
            res.status(200).send(userList);
            console.log(userList);
        }
    } catch (err) {
      console.error(err.message);
    }
});

module.exports = router;