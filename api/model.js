/*
* Model.js connects to the database 
* and manages the entity.
* functions are exported to server.js
* to serve as callback for the api methods
*/

let database = require('./database');

let requestsTable = database.RequestsTable;
let usersTable = database.UsersTable;

console.log(usersTable );

let userRecord = { "id": 0, "type": "user", "email": "", "password": "", "firstName": "", "lastName": "", "phone": "", "address": "", "createdOn": "" };
let requestRecord = { "id": 0, "user": 0, "subject": "", "description": "", "status": "Pending", "priority": "Normal", "createdOn": "" };


function today() {
    return new Date().toJSON().slice(0, 10);
}

function updateDatabase(){
    //const newData =  JSON.stringify(database);
    const newData =  JSON.stringify(database, null, 2);
    fs.writeFile('database.json', newData, finished);
    function finished(err) {
        if (err) throw err;
        console.log('Database table has been modified.');
    }
}



function sendUsers(request, response) {
    response.send(usersTable);
}


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


function sendRequests(request, response) {
    response.send(requestsTable);
}


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


function sendUserRequests(request, response) {
    const data = request.params;
    const userId = data.userId || 1 ;
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


function _updateRequest(newRequest) {
    const i = (newRequest.id) - 1;
    requestsTable[i] = newRequest;

    // Modify Table at database.json
    updateDatabase();
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

module.exports = {
    updateDatabase,
    sendUsers,
    sendUser,
    sendRequests,
    sendRequest,
    sendUserRequests,
    getUserRequests,
    today,
    createUser,
    loginUser,
    createRequest,
    updateRequest
}