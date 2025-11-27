const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    id: {
        type: integer,
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
        type: string,
    },
    role:{
        type: String,
    }
});

module.exports = mongoose.model('User', BookSchema);