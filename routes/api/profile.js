const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/me', auth, async (req, res) => {
    try {
     const profile = await Profile.findOne({ user: req.user.id}).populate('user', ['name', 'avatar']);

     if(!profile){
         return res.status(400).json({ msg: 'There is no profile for this user' });
     };

     res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});

router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty(),
]], async (req, res) => {
   const errors = validationResult(req);

   if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array() });
   }

   const { name } = req.body;
   
   const profileName = {};
   profileName.user = req.user.id;
   if(name) profileName.name = name;

  try {
      let profile = await Profile.findOne({ user: req.user.id });

      if(profile){
          profile = await Profile.findOneAndUpdate(
              { user: req.user.id }, 
              { $set: profileName }, 
              { new: true });

              return res.json(profile);
      }

      profile = new Profile(profileName);

      await profile.save();
      res.json(profile);
  }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;