/*
* Server.js is the entry point of the application api
* It require(s) the model.js that contacts call backs
*/

const model = require('./model');

var express = require('express');
var app = express();

function listening() {
    console.log('Maintenance API is listening on port 3000!');
}

var server = app.listen(3000, listening);


app.use(express.static('website'));

app.get('/users', model.sendUsers);


// View a particular user details
app.get('/users/:userId', model.sendUser);


// View all rquests from all users
app.get('/requests', model.sendRequests);


// View a particular request details
app.get('/requests/:requestId', model.sendRequest);


// View all requests from a particular user
app.get('/user/requests/:userId', model.sendUserRequests);


// Create a user
app.get('/create/users/:type/:email/:password/:firstName/:lastName/:phone/:address?', model.createUser);


app.get('/user/login/:email/:password', model.loginUser);


app.get('/create/requests/:user/:subject/:description/:status/:priority', model.createRequest);

// Modify Maintenance Request

app.get('/update/requests/:id/:user/:subject/:description/:status/:priority', model.updateRequest);


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