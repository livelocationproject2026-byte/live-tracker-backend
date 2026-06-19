const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    
    userid: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    placeName: {
        type: String,
        default: "Fetching location details..."
    },
    googleLink: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("locations", LocationSchema);