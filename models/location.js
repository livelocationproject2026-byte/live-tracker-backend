const mongoose = require("mongoose");

const LocationSchema =
new mongoose.Schema({

    personName:{
        type:String,
        required:true
    },

    latitude:{
        type:Number,
        required:true
    },

    longitude:{
        type:Number,
        required:true
    },

    googleLink:{
        type:String
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports =
mongoose.model("locations", LocationSchema);