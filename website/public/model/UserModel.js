const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        UserID: {
            type : String,
            required : true,
        },
        Password:{
            type : String,
            required : true,
        },
        ICNum: {
            type : String,
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