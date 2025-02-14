const express = require('express');

const { getuser, deleteuser, updateuser, reguser, login } = require('./Registration_Controller'); 

const route = express.Router();

route.get('/getuser', getuser);

// route.post('/postuser', adduser);

route.post('/reguser', reguser);

route.post('/login', login);

route.delete('/deleteuser/:id', deleteuser);

route.put('/putuser/:_id', updateuser);


module.exports = route;