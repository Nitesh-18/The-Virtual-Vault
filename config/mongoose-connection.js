const mongoose = require('mongoose');
const config = require('config');

const dbgr = require('debug')("development: mongoose");


mongoose
.connect(`${config.get("MONGODB_URI")}/The_Virtual_Vault`)
.then(function(){
    dbgr('Database Connected');
})
.catch(function(err){
    dbgr(err);
});

module.exports = mongoose.connection;