const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    },
    role:{
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);