/*
* Server.js is the entry point of the application api
* It require(s) the model.js that contacts call backs
*/

// const model = require('./model-json');
 const model = require('./model-pgsql');
 var bodyParser = require('body-parser');


var express = require('express');
var app = express();

function listening() {
    console.log('Maintenance API is listening on port 3000!');
}

var server = app.listen(3000, listening);


app.use(express.static('./../ui'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//app.get('/users', model.sendUsers);


// View a particular user details
//app.get('/users/:userId', model.sendUser);


// View all rquests from all users
app.get('/requests', model.readAllRequests);


// View a particular request details
//app.get('/requests/:requestId', model.sendRequest);


// View all requests from a particular user
app.get('/users/requests/:userId?', model.readAllUserRequests);


// Create a user /users/:type/:email/:password/:firstName/:lastName/:phone/:address?
// app.post('/users', model.createUser);


// Create Request users/requests/:user/:subject/:description/:status/:priority
app.post('/users/requests', model.createRequest);

// Update Maintenance Request /users/requests/:id/:user/:subject/:description/:status/:priority'
app.put('/users/requests/:requestId', model.updateRequest);


/*
'/users' => All users
'/user/login/:email/:password' => loginUser
'/requests' => All requests
'/requests/:requestId' => A particular Request
'/users/:userId' => A particular User
'/user/requests/:userId' => View all requests from a particular user
'/create/users/:type/:email/:password/:firstName/:lastName/:phone/:address'
'/create/requests/:user/:subject/:description/:status/:priority'
'/update/requests/:id/:user/:subject/:description/:status/:priority'
*/