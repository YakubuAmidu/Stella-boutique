const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
   },
   icon: {
       type: String
   },
   color: {
       type: String
   },
});

module.exports = Category = mongoose.model('Category', CategorySchema);