
/*
 import { today, isStringOk, isNumberOk  } from "./database";
 import { isUser, getUser, getAllUsers, updateUser, getUserIndex  } from "./database";
 import { getRequestsIndex, getAllRequests } from "./database";
 const getRequest = require("./database").getRequest;
*/

//import { getUserRequests, getRequest, createRequest, updateRequest  } from "./database";

const express = require('express');

const app = express();

const PORT = 5000;

const server = app.listen(PORT, listening);

function listening() {
	console.log(`listening on port ${PORT}...`);
}

app.use(express.static('website'));

/*
// ROUTING FUNCTIONS
function _sendUserRequests (request, response) {
	const reply = response.send(getUserRequests());
	response.send(reply);
}


function _sendRequest(request, response) {

   const data = request.params;
   const requests = data.requests;
   const id = data.id;

   const reply = getRequest(id)

   response.send(reply);
}

function _createRequest(request, response) {
   const data = request.params;

   const id = data.id;
   const user = data.user;
   const subject = data.subject;
   const description = data.description;
   const status = data.status;
   const priority = data.priority;
   const createdOn = today();

   const reply = createRequest(user, subject, description, status, priority, createdOn);
   response.send(reply);
}

//let createParam = '/users/requests/create/:id/:user';
//createParam += '/:subject/:description/:status/:priority/:createdOn';

//app.get(createParam, createRequest);

function _updateRequest (request, response) {
   const data = request.params;

   // Param attrib
   const id = data.id;
   const user = data.user;
   const subject = data.subject;
   const description = data.description;
   const status = data.status;
   const priority = data.priority;
   const createdOn = today();

   updateRequest(id, user, subject, description, status, priority, createdOn);
}

// UPDATE REQUEST

let updateParam = '/users/requests/update/:id/:user';

updateParam += '/:subject/:description/:status/:priority/:createdOn';

app.get(updateParam, updateRequest);


// ROUTING

// Fetch all the requests of a logged in user: GET /users/requests
app.get('/users/requests', _sendUserRequests);

// Fetch a single request GET /users/requests/<requestId>

app.get('/users/:requests/:id', _sendRequest);

// Create a request: POST /users/requests
app.post('/users/requests/', _createRequest);

// Modify a request : PUT /users/requests/<requestId>
app.put('/users/:requests/:id', _updateRequest);

*/