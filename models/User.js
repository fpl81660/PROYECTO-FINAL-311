const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
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
        enum: ['admin', 'technician', 'viewer'],
    }
});

module.exports = mongoose.model('User', UserSchema);