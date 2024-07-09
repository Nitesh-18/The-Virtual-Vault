const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true,
        trim: true,
    },
    email: String,
    password: {
        type: String,
        minLength: 6,
        required: true,
        specialCharacter: true,    
    },
    products: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
    gstIn: String

});

module.exports = mongoose.model('user',"userSchema");

