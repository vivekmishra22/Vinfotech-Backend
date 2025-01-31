// It's is a middleware to handle multipart/ form-data, commonly used for file upload
const multer = require('multer')        
// Node.js modue to handle and transforming file paths, it is also used to contruct file path in platform-independent manner
const path = require('path')            

// Setting up storage configuration for uploaded files 
const photoStorage = multer.diskStorage({

    // Define the destination directory for uploaded files( where uploaded files will be stored )
    destination: (req, file, cb) => {             
        // `cb` is a callback function used to set the destination( where files will be saved )
        // `null` indicates no error, and the second argument is the destination path
        cb(null, path.join(__dirname, './Images'))      // Saves/stores files inside the "Images" folder in the current directory
    },

    // Define the filename for uploaded files
    filename: (req, file, cb) => {

        // The original file name is used as the storage name
        cb(null, file.originalname)
    }
})

// Configure the `multer` middleware with the storage engine and file size limits
const photoUpload = multer({

    // Setting the storage engine defined above
    storage: photoStorage,
    limits: { fileSize: 5 * 1024 * 1024 * 1024 },       // Limiting the file size to 5GB (5 * 1024 * 1024 * 1024 bytes)
}).single('image');                                     // Accepts a **single** file with the field name "image"

// Export the `photoUpload` middleware to be used in other parts of the application
module.exports = { photoUpload };

// const photoUpload1 = multer({
//     storage:photoStorage,
//     limits: { fileSize: 5 * 1024 * 1024 *1024 },
// }).single('icon');

// const multer = require('multer')
// const path = require('path')

// const photoStorage = multer.diskStorage({
//     destination : ( req, file, cb) => {
//         cb(null,path.join(__dirname,'./Images'))
//     },
//     filename: (req, file, cb) => {
//         cb(null,file.originalname)
//     }
// })

// const photoUpload = multer({
//     storage:photoStorage,
//     limits: { fileSize: 5 * 1024 * 1024 *1024 },
// }).single('image');

// module.exports = {photoUpload};

// const express = require('express')
// const cors = require('cors')
// const multer = require('multer')

// const app = express()
// app.use(cors())
// app.use(express.json())

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "./Images")
//   },
//   filename: function (req, file, cb) {
//     return cb(null,file.originalname)
//   }
// })

// const upload = multer({storage})

// app.post('/Images', upload.single('file'), (req, res) => {

// })

// app.listen(3001, () => {
//   console.log("Server is running")
// })