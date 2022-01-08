const express = require('express');
const User = require('../models/user');
const router = express.Router();
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const userList = await User.find().select('-password');

        if(!userList){
           return res.status(500).json({ success: false });
        } else {
            return res.status(200).send(userList);
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
            return res.status(500).json({ message: 'The user with the given ID was not found!👎'});
        } else {
            return res.status(200).send(user);
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
      }, {
          new: true
      });

      user = await user.save();

      if(!user){
          return res.status(400).send('The user cannot be created!👎')
      } else {
          return res.status(200).send(user);
          console.log(user);
      }
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const secret = process.env.SECRET;

        if(!user){
            return res.status(400).send('The user cannot be found!👎');
        } else if(user && bcrypt.compareSync(req.body.password, user.password))
        {
            const token = jwt.sign(
                {
                    user: user.id
                },
                secret
            )
            return res.status(200).send({ user: user.email, token });
        } else {
            return res.status(400).send('Password is wrong!👎');
        }
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;