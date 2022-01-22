const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.get('/', async (req, res) => {
    const userList = await User.find().select('-passwordHash');
    
    try {

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
    const user = await User.findById(req.params.id).select('-passwordHash');

    try {

        if(!user) {
            return res.status(500).json({ message: 'The user with the given ID was not found!👎'});
        } else {
            return res.status(200).send(user);
        }

    } catch (err) {
        console.error(err.message);
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, email, passwordHash, phone, isAdmin, street, apartment, zip, city, country, date } = req.body;

        const avatar = gravatar.url(email, {
            s: '100',
            r: 'pg',
            d: 'mm',
        });

      let user = new User({
         name,
         email,
         passwordHash: bcrypt.hashSync(req.body.password, 10),
         avatar,
         phone,
         isAdmin,
         street,
         apartment,
         zip,
         city,
         country,
         date
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
        } else if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                secret,
                {
                    expiresIn: '1d'
                }
            )

            return res.status(200).send({ user: user.email, token: token });
        } else {
            return res.status(400).send('Password is wrong👎')
        }
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/register', async (req, res) => {
    const { name, email, passwordHash, phone, isAdmin, street, apartment, zip, city, country } = req.body;

    let user = new User({
        name,
        emeil, 
        passwordHash,
        phone,
        isAdmin,
        street,
        apartment,
        zip, 
        city,
        country
    });

    user = await user.save();

    if(!user){
        return res.status(400).send('User cannot be created!👎');
    }

    res.send(user);
});

router.get('/get/count', async (req, res,) => {
    const userCount = await User.countDocuments((count) => count)

    if(!userCount){
        res.status(500).json({ success: false });
    } else {
        res.send({
            userCount: userCount
        })
    }
})

module.exports = router;


// const express = require('express');
// const router = require('./categories');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator');

// const User = require('../models/user');

// router.get('/', async (req, res) => {
//     try {
//       const userList = await User.find();

//       if(!user){
//           res.status(400).json({ success: false });
//       } else {
//           res.status(200).send(userList);
//       }
         
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// router.post('/', [
//     check('name', 'Name is required!👍').not().isEmpty(),
//     check('email', 'Please enter a valid email!👍').isEmail(),
//     check('password', 'Please enter a password with 6 or more characters!👍').isLength({ min: 6 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         // const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;
        
//         // let user = await User.findOne({ email });

//         // if(user){
//         //     res.status(400).json({ errors: [{ msg: 'User already exist👍' }]});
//         // }

//         // const avatar = gravatar.url(email, {
//         //     s: '100',
//         //     r: 'pg',
//         //     d: 'mm'
//         // });

//         // const { name, email, password, phone, isAdmin, street, apartment, zip, city, country } = req.body;

//         const avatar = gravatar.url(email, {
//             s: '100',
//             r: 'pg',
//             d: 'mm'
//         });

//         let user = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             avatar: req.body.avatar,
//             phone: req.body.phone,
//             isAdmin: req.body.isAdmin,
//             street: req.body.street,
//             apartment: req.body.apartment,
//             zip: req.body.zip,
//             city: req.body.city,
//             country: req.body.country
//         },
//         {
//             new: true
//         }
//         );

//         const salt = await bcrypt.genSalt(10);

//         user.password = await bcrypt.hash(password, salt);

//         await user.save();
//         res.send('User registered');
//         console.log(user);
//     } catch (err) {
//      console.error(err.message);
//      res.status(500).send('Server Error🚫');
//     }
// });

// module.exports = router;