const express = require('express');
var bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const userList = await User.find().select('-password');

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

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if(!user) {
            res.status(500).json({ message: 'The user with the given ID was not found!👎'});
        } else {
            res.status(200).send(user);
            console.log(user);
        }

    } catch (err) {
        console.error(err.message);
    }
})

router.post('/', async (req, res) => {
    try {
      let user = new User({
         name: req.body.name,
         email: req.body.email,
         password: bcrypt.hashSync(req.body.password, 10),
         phone: req.body.phone,
         isAdmin: req.body.isAdmin,
         street: req.body.street,
         apartment: req.body.apartment,
         zip: req.body.zip,
         city: req.body.city,
         country: req.body.country,
         date: req.body.date
      });

      user = await user.save();

      if(!user){
          res.status(400).send('The user cannot be created!👎')
      } else {
          res.status(200).send(user);
          console.log(user);
      }
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;