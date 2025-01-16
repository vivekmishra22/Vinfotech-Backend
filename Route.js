const express = require('express');
const { getdata, add, GetuserById, deletedata, putdata } = require('./Controller');

const route = express.Router();

const {photoUpload} = require('./upload');


// route.post('/upload', photoUpload , add)

route.get('/getdata', getdata);

route.get('/getuserdata/:_id', GetuserById);

route.post('/postdata', photoUpload, add);

route.delete('/deletedata/:id', deletedata);

route.put('/putdata/:_id', photoUpload , putdata);


module.exports = route;