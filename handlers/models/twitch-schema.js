const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    titletwitch: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('twitch', Schema)