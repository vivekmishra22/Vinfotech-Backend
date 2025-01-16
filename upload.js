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

const multer = require('multer')
const path = require('path')

const photoStorage = multer.diskStorage({
    destination : ( req, file, cb) => {
        cb(null,path.join(__dirname,'./Images'))
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
})

const photoUpload = multer({
    storage:photoStorage,
    limits: { fileSize: 5 * 1024 * 1024 *1024 },
}).single('image');

// const photoUpload1 = multer({
//     storage:photoStorage,
//     limits: { fileSize: 5 * 1024 * 1024 *1024 },
// }).single('icon');

module.exports = {photoUpload}