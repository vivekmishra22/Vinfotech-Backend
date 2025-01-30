const multer = require('multer')        // It's is a middleware to handle multipart/ form-data, commonly used for file upload
const path = require('path')            // Node.js modue to handle and transforming file paths, it is also used to contruct file path in platform-independent manner

const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {             //cb : callback function to set destination
        cb(null, path.join(__dirname, './Images'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const photoUpload = multer({
    storage: photoStorage,
    limits: { fileSize: 5 * 1024 * 1024 * 1024 },
}).single('image');


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