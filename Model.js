const mongoose = require('mongoose')    // Import the Mongoose library to interact with MongoDB

const Course = mongoose.Schema({  // Defining the schema for the "mern" model, A schema defines the structure of documents in a collection

    ctitle:String,  // Define a field `ctitle` of type String to store the course title
    ctext:String,   // Define a field `ctext` of type String to store the course description or text
    image:String    // Define a field `image` of type String to store the URL or path of the course image
 })

module.exports = mongoose.model('mern', Course);
// Export the Mongoose model for the "Course" schema
// The model is named "mern" and will correspond to a collection named "merns" in MongoDB
// (Mongoose automatically pluralizes the model name to create the collection name)





