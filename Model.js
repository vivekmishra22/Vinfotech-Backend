const mongoose = require('mongoose')

const Course = mongoose.Schema({
    ctitle:String,
    ctext:String,
    image:String
})

module.exports = mongoose.model('mern', Course);