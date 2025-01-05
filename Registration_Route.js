const express = require('express');
const { getuser, adduser, deleteuser, updateuser } = require('./Registration_Controller');

const route = express.Router();

route.get('/getdata', getuser);

route.post('/postdata', adduser);

route.delete('/deletedata/:id', deleteuser);

route.put('/putdata/:_id', updateuser);


module.exports = route;