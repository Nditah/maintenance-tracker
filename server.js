/*
// Moved to database.json
let UsersTable = [
    { "id": 1, "type": "admin", "email": "admin@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-09" },
    { "id": 2, "type": "user", "email": "user@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-10" },
    { "id": 3, "type": "user", "email": "sam@andela.com", "password": "pass", "firstName": "Samweld", "lastName": "Nditah", "phone": "123-456-777", "address": "Epic Tower", "createdOn": "2018-05-12" }
];


let RequestsTable = [
    { "id": 1, "user": 1, "subject": "Webpay", "description": "Typescript Wrapper", "status": "Pending", "priority": "Low", "createdOn": "2018-05-12" },
    { "id": 2, "user": 2, "subject": "Erlang Server", "description": "Chat Messenger", "status": "Pending", "priority": "High", "createdOn": "2018-05-02" },
    { "id": 3, "user": 3, "subject": "Django", "description": "Python framework", "status": "Pending", "priority": "Normal", "createdOn": "2018-05-11" },
    { "id": 4, "user": 1, "subject": "Java", "description": "Spring JEE", "status": "Pending", "priority": "Low", "createdOn": "2018-05-12" },
    { "id": 5, "user": 2, "subject": "Rest API", "description": "GraphQL Integration", "status": "Pending", "Normal": "Low", "createdOn": "2018-05-12" },
    { "id": 6, "user": 3, "subject": "Rust", "description": "Go Rust Speed Test", "status": "Pending", "priority": "High", "createdOn": "2018-05-14" },
    { "id": 7, "user": 1, "subject": "Andela", "description": "EPIC All the Way", "status": "Pending", "priority": "Low", "createdOn": "2018-05-17" },
    { "id": 8, "user": 3, "subject": "Samweld", "description": "3Dcoder Top 1%", "status": "Pending", "priority": "High", "createdOn": "2018-05-21" }
];

*/
let userRecord = { "id": 0, "type": "user", "email": "", "password": "", "firstName": "", "lastName": "", "phone": "", "address": "", "createdOn": "" };
let requestRecord = { "id": 0, "user": 0, "subject": "", "description": "", "status": "Pending", "priority": "Normal", "createdOn": "" };

var fs = require('fs'); // to read database.json from fs

var databaseFile = fs.readFileSync('database.json');
let database = JSON.parse(databaseFile);
let requestsTable = database.RequestsTable;
let usersTable = database.UsersTable;

console.log(usersTable );

// Write to database.json File

function updateDatabase(){
    //const newData =  JSON.stringify(database);
    const newData =  JSON.stringify(database, null, 2);
    fs.writeFile('database.json', newData, finished);
    function finished(err) {
        if (err) throw err;
        console.log('Database table has been modified.');
    }
}

var express = require('express');
var app = express();

function listening() {
    console.log('Maintenance API is listening on port 3000!');
}
var server = app.listen(3000, listening);

/*
app.get('/', function (req, res) {
    res.send('Index / Hello World!');
});
*/
app.use(express.static('website'));

app.get('/users', sendUsers);

function sendUsers(request, response) {
    response.send(usersTable);
}

// View a particular user details
app.get('/users/:userId', sendUser);

function sendUser(request, response) {
    let reply = { msg:"Error! Invalid request", status:400, feedback:{}}; 
    const data = request.params;
    const i = Number(data.userId); 
    if(Number.isInteger(i) && i > 0 && i <= usersTable.length) {
        reply.feedback = usersTable[i-1]; // zero based index object
        reply.msg = "Found!";
        reply.status= 200;
    }
    
    response.send(reply);
}


// View all rquests from all users
app.get('/requests', sendRequests);

function sendRequests(request, response) {
    response.send(requestsTable);
}

// View a particular request details
app.get('/requests/:requestId', sendRequest);

function sendRequest(request, response) {
    let reply = { msg:"not found", status:400, feedback:{}}; 
    const data = request.params;
    const i = Number(data.requestId); 
    if(requestsTable[i-1]) {
        reply.feedback = requestsTable[i-1]; // zero based index object
        reply.msg = "found";
        reply.status= 200;
    }
    
    response.send(reply);
}


// View all requests from a particular user
app.get('/user/requests/:userId', sendUserRequests);

function sendUserRequests(request, response) {
    const data = request.params;
    const userId = data.userId;
    let userRequests = getUserRequests(userId);
    response.send(userRequests);
}

// A Particular User's Requests
function getUserRequests(userId) {
    let userRequests = [];
    if (userId > 0 && userId <= usersTable.length + 1) {
        for (let i = 0; i < requestsTable.length; i++) {
            if (requestsTable[i].user == userId) {
                userRequests.push(requestsTable[i])
            }
        }
        return userRequests;
    } else {
        // throw "Invalid User ID";
    }
}

// Create a user
app.get('/create/users/:type/:email/:password/:firstName/:lastName/:phone/:address?', createUser);

function today() {
    return new Date().toJSON().slice(0, 10);
}

function createUser(request, response) {
    // create new user objects
    let reply = { msg:""}; 
    let ok = true;
    const data = request.params;
    userRecord.id = usersTable.length + 1;
    userRecord.type = data.type;
    userRecord.email = data.email;
    userRecord.password = data.password;
    userRecord.firstName = data.firstName;
    userRecord.lastName = data.lastName;
    userRecord.phone = data.phone;
    if(!userRecord.phone) {
        reply = { msg:"Phone is required"}
        ok = false
    }
    userRecord.address = data.address;
    if(!userRecord.address) {
        userRecord.address = "Andela, Epic Tower"
    }
    userRecord.createdOn = today();

    console.log(userRecord);

    const record = _createUser(userRecord);

    if(ok) {
        reply = { 
                msg: "New user added @ index #" + record
            }
    }
    

    response.send(reply);
}

function _createUser(newUser) {
    const i = (newUser.id) - 1;
    usersTable.push(newUser);
    
    // Modify Table at database.json
    updateDatabase();
    return i; // record inserted successfully
}

// Login User

app.get('/user/login/:email/:password', loginUser);

function loginUser(request, response) {
    const data = request.params;
    const email = data.email.trim();
    const password = data.password.trim();

    console.log("\n\rUser: "+ email + " Password: "+ password);

    let reply = { msg:"Error! Invalid credentials", status:400, feedback:{} }; 

	if (email.length > 4 && password.length > 0) {
		for (let i = 0; i < usersTable.length; i++) {
			if (usersTable[i].email === email && usersTable[i].password === password) {
                reply.msg = "Success";
                reply.status = 200;
                reply.feedback = usersTable[i];
                break;
			} else {
                console.log(usersTable[i].email + " != "+ email )
                reply.msg = "Fail! User not found";
                reply.status = 401;
                reply.feedback  = {};
            }
		}
	} else {
        // throw "Invalid input email or password ";
        reply.msg = "Fail! Invalid credentials";
        reply.status = 401;
        reply.feedback  = {};
    }

    response.send(reply);
}

// Add New Maintenance Request

function _createRequest(newRequest) {
    const i = (newRequest.id) - 1;
    requestsTable.push(newRequest);

    // Modify Table at database.json
    updateDatabase();

    return i; // db record inserted successfully if i > 0
}

function createRequest(request, response) {
    // create new user objects
    const data = request.params;
    requestRecord.id = requestsTable.length + 1;
    requestRecord.user = data.user;
    requestRecord.subject = data.subject;
    requestRecord.description = data.description;
    requestRecord.status = data.status;
    requestRecord.priority = data.priority;
    requestRecord.createdOn = today();

    console.log(requestRecord);

    const record = _createRequest(requestRecord);

    const reply = {
        msg: "New request added @ index #" + record
    }

    response.send(reply);
}

app.get('/create/requests/:user/:subject/:description/:status/:priority', createRequest);

// Modify Maintenance Request


function _updateRequest(newRequest) {
    const i = (newRequest.id) - 1;
    requestsTable[i] = newRequest;

    // Modify Table at database.json
    updateDatabase();

    /*
    // requestsTable[i].id = newRequest.id;
    requestsTable[i].user = newRequest.user;
    requestsTable[i].subject = newRequest.subject;
    requestsTable[i].description = newRequest.description;
    requestsTable[i].status = newRequest.status;
    requestsTable[i].priority = newRequest.priority;
    requestsTable[i].createdOn = today();
    */
    return i; // db record updated successfully if i > 0
}

function updateRequest(request, response) {
    // create new user objects
    const data = request.params;
    requestRecord.id = data.id;
    requestRecord.user = data.user;
    requestRecord.subject = data.subject;
    requestRecord.description = data.description;
    requestRecord.status = data.status;
    requestRecord.priority = data.priority;
    requestRecord.createdOn = today();

    console.log(requestRecord);

    const record = _updateRequest(requestRecord);

    const reply = {
        msg: "Record successfully modified @ index #" + record
    }

    response.send(reply);
}

app.get('/update/requests/:id/:user/:subject/:description/:status/:priority', updateRequest);


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