const mongoose = require('mongoose')

const Course = mongoose.Schema({
    ctitle:String,
    ctext:String
})

module.exports = mongoose.model('mern', Course);