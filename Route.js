const express = require('express');
const { getdata, add, GetuserById, deletedata, putdata } = require('./Controller');

const route = express.Router();

route.get('/getdata', getdata);

route.get('/getuserdata/:_id', GetuserById);

route.post('/postdata', add);

route.delete('/deletedata/:id', deletedata);

route.put('/putdata/:_id', putdata);


module.exports = route;