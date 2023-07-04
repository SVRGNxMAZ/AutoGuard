const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        UserID: {
            type : Number,
            required : true,
        },
        Password:{
            type : String,
            required : true,
        },
        ICNum: {
            type : Number,
            required : true,
        },
        Name: {
            type : String,
            required : true,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);
module.exports = User;