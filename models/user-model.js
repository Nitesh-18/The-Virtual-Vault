const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/The_Virtual_Vault`);

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String

});

module.exports = mongoose.model('user',"userSchema");

