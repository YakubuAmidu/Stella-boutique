const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
        default: '',
    },
    apartment: {
        type: String,
        default: '',
    },
    zip: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
});

module.exports = User = mongoose.model('User', UserSchema);
// exports.UserSchema = UserSchema;


