
var UsersTable = [
{ "id": 1 , "type": "admin" , "email": "admin@andela.com", "password": "pass", "firstName": "Scott" , "lastName": "Tiger", "phone": "123-456-777" , "address": "Upper Str.", "createdOn": "2018-05-09" },
{ "id": 2 , "type": "user" , "email": "user@andela.com", "password": "pass", "firstName": "Scott" , "lastName": "Tiger", "phone": "123-456-777" , "address": "Upper Str.", "createdOn": "2018-05-10" },
{ "id": 3 , "type": "user" , "email": "sam@andela.com", "password": "pass", "firstName": "Samweld" , "lastName": "Nditah", "phone": "123-456-777" , "address": "Epic Tower", "createdOn": "2018-05-12" }
]

var RequestsTable = [
{ "id": 1 , "user": 1 , "subject": "Webpay" , "description": "Typescript Wrapper", "status": "Pending" , "priority": "Low", "createdOn": "2018-05-12" },
{ "id": 2 , "user": 2 , "subject": "Erlang Server" , "description": "Chat Messenger", "status": "Pending" , "priority": "High", "createdOn": "2018-05-02" },
{ "id": 3 , "user": 3 , "subject": "Django" , "description": "Python framework", "status": "Pending" , "priority": "Normal", "createdOn": "2018-05-11" },
{ "id": 4 , "user": 1 , "subject": "Java" , "description": "Spring JEE", "status": "Pending" , "priority": "Low", "createdOn": "2018-05-12" },
{ "id": 5 , "user": 2 , "subject": "Rest API" , "description": "GraphQL Integration", "status": "Pending" , "Normal": "Low", "createdOn": "2018-05-12" },
{ "id": 6 , "user": 3 , "subject": "Rust" , "description": "Go Rust Speed Test", "status": "Pending" , "priority": "High", "createdOn": "2018-05-14" },
{ "id": 7 , "user": 1 , "subject": "Andela" , "description": "EPIC All the Way", "status": "Pending" , "priority": "Low", "createdOn": "2018-05-17" },
{ "id": 8 , "user": 3 , "subject": "Samweld" , "description": "3Dcoder Top 1%", "status": "Pending" , "priority": "High", "createdOn": "2018-05-21" }
]	

console.log("Server is running...")

var express = require("express")

var app = express()

const PORT = 3000

var server = app.listen(PORT, listening)

function listening() {
	console.log("listening on port " + PORT + "...")
}

app.use(express.static("website"))


// ROUTING

// Fetch all the requests of a logged in user: GET /users/requests
app.get("/users/requests/", sendAllRequests)

// Fetch a single request that belongs to a logged in user
// GET /users/requests/<requestId>
app.get("/users/:requests/:id", sendRequest) ; 

// Create a request: POST /users/requests
app.post("/users/requests/", sendRequest) ; 

// Modify a request : PUT /users/requests/<requestId>
app.put("/users/:requests/:id", sendRequest) ; 


function sendRequest(request, response) {
	response.send("These are users maintenance request")
}

app.get("/request/:id", sendRequest)

function sendRequest(request, response) {
	
	var data = request.params
	var requests = data.requests
	var id = data.id
	
	var reply = " Maintenance Request ID is "+ id 
	reply += " Maintenance Requests are "+ requests  
	
	response.send(reply)
}

function sendAllRequests(request, response) {
	response.send(RequestsTable)
}

// CREATE REQUEST
app.get("/users/requests/create/:id/:user/:subject/:description/:status/:priority/:createdOn", createRequest)

function createRequest(request, response) {
	var data = request.params
	
	var id =  data.id
	var user =  data.user
	var subject =  data.subject
	var description =  data.description
	var status =  data.status
	var priority =  data.priority
	var createdOn =  data.createdOn
	
	var newRequest = { "id": id , "user": user , "subject": subject , "description": description, "status": status , "priority": priority, "createdOn": createdOn }
	
	RequestsTable.push(newRequest) 
	
}

// UPDATE REQUEST 

app.get("/users/requests/update/:id/:user/:subject/:description/:status/:priority/:createdOn", updateRequest)

function updateRequest(request, response) {
	var data = request.params
	
	var id =  data.id
	var user =  data.user
	var subject =  data.subject
	var description =  data.description
	var status =  data.status
	var priority =  data.priority
	var createdOn =  data.createdOn
	
	var modifyRequest = { "id": id , "user": user , "subject": subject , "description": description, "status": status , "priority": priority, "createdOn": createdOn }
	
	RequestsTable.push(modifyRequest) 
	
}