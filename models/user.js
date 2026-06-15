const mongoose = require("mongoose");

const UserSchema =
new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    userid:{
        type:String,
        required:true,
        unique:true
    },

    address:{
        type:String
    },

    password:{
        type:String,
        required:true
    }
});

module.exports =
mongoose.model("users", UserSchema);