const express = require('express');
const { getdata, add, deletedata, putdata } = require('./Controller');

const route = express.Router();

route.get('/getdata', getdata);

route.post('/postdata', add);

route.delete('/deletedata/:id', deletedata);

route.put('/putdata/:_id', putdata);


module.exports = route;