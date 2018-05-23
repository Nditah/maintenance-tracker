export function today() {
	return new Date().toJSON().slice(0, 10);
}

export function isStringOk(val) {
	if (val.length > 0 && val != undefined && val != null) {
		return true;
	}
	{
		return false;
	}
}

export function isNumberOk(val) {
	if (val > 0 && val != undefined && val != null) {
		return true;
	}
	{
		return false;
	}
}


var UsersTable = {
	usersTable: [
		{ "id": 1, "type": "admin", "email": "admin@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-09" },
		{ "id": 2, "type": "user", "email": "user@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-10" },
		{ "id": 3, "type": "user", "email": "sam@andela.com", "password": "pass", "firstName": "Samweld", "lastName": "Nditah", "phone": "123-456-777", "address": "Epic Tower", "createdOn": "2018-05-12" }
	],


	_getUserIndex: function (userId) {
		if (userId <= this.usersTable.length + 1) {
			for (var i = 0; i < this.usersTable.length; i++) {
				if (this.usersTable[i]["id"] === userId) {
					return i;
				}
			}
		}
		else {
			// throw "Invalid User ID";
		}
		return -1;
	}
}


export function updateUser(id, type, email, password, firstName, lastName, phone, address, createdOn) {
	// get the user index
	const i = getUserIndex(id);
	if (type)
		UsersTable.usersTable[i]["type"] = type;
	if (email)
		UsersTable.usersTable[i]["email"] = email;
	if (password)
		UsersTable.usersTable[i]["password"] = password;
	if (firstName)
		UsersTable.usersTable[i]["firstName"] = firstName;
	if (lastName)
		UsersTable.usersTable[i]["lastName"] = lastName;
	if (phone)
		UsersTable.usersTable[i]["phone"] = phone;
	if (address)
		UsersTable.usersTable[i]["address"] = address;
	if (createdOn)
		UsersTable.usersTable[i]["createdOn"] = createdOn;
	return 1;
}

export function getUserIndex(user_id) {
	return UsersTable._getUserIndex(user_id);
}

export function getAllUsers() {
	return UsersTable.usersTable;
}

export function getUser(user_id) {
	const i = getUserIndex(user_id);
	return UsersTable.usersTable[i];
}

export function isUser(email, password) {
	if (email.length > 4 && password.length > 0) {
		for (var i = 0; i < UsersTable.usersTable.length; i++) {
			if (UsersTable.usersTable[i].email == email && UsersTable.usersTable[i].password == password) {
				return true;
			}
		}
		return false;
	}
	else {
		// throw "Invalid input email or password ";
	}
}

var RequestsTable = {

	requestsTable: [
		{ "id": 1, "user": 1, "subject": "Webpay", "description": "Typescript Wrapper", "status": "Pending", "priority": "Low", "createdOn": "2018-05-12" },
		{ "id": 2, "user": 2, "subject": "Erlang Server", "description": "Chat Messenger", "status": "Pending", "priority": "High", "createdOn": "2018-05-02" },
		{ "id": 3, "user": 3, "subject": "Django", "description": "Python framework", "status": "Pending", "priority": "Normal", "createdOn": "2018-05-11" },
		{ "id": 4, "user": 1, "subject": "Java", "description": "Spring JEE", "status": "Pending", "priority": "Low", "createdOn": "2018-05-12" },
		{ "id": 5, "user": 2, "subject": "Rest API", "description": "GraphQL Integration", "status": "Pending", "Normal": "Low", "createdOn": "2018-05-12" },
		{ "id": 6, "user": 3, "subject": "Rust", "description": "Go Rust Speed Test", "status": "Pending", "priority": "High", "createdOn": "2018-05-14" },
		{ "id": 7, "user": 1, "subject": "Andela", "description": "EPIC All the Way", "status": "Pending", "priority": "Low", "createdOn": "2018-05-17" },
		{ "id": 8, "user": 3, "subject": "Samweld", "description": "3Dcoder Top 1%", "status": "Pending", "priority": "High", "createdOn": "2018-05-21" }
	],

	_getRequestsIndex: function (req_Id) {
		if (req_Id <= this.requestsTable.length + 1) {
			for (var i = 0; i < this.requestsTable.length; i++) {
				if (this.requestsTable[i]["id"] == req_Id) {
					return i; //this.RequestsTable[i];
				}
			}
		}
		else {
			// throw "Invalid Request ID";
		}
		return -1;
	}
}

export function getRequestsIndex(req_id) {
	return RequestsTable._getRequestsIndex(req_id);
}

export function updateRequest(id, user, subject, description, status, priority, createdOn) {
	// get the user index
	const i = getRequestsIndex(id);
	if (user)
		RequestsTable.requestsTable[i]["user"] = user;
	if (subject)
		RequestsTable.requestsTable[i]["subject"] = subject;
	if (description)
		RequestsTable.requestsTable[i]["description"] = description;
	if (status)
		RequestsTable.requestsTable[i]["status"] = status;
	if (priority)
		RequestsTable.requestsTable[i]["priority"] = priority;
	if (createdOn)
		RequestsTable.requestsTable[i]["createdOn"] = createdOn;
	return 1;
}

export function createRequest(user, subject, description, status, priority, createdOn) {
	// get the user index
	const i = RequestsTable.requestsTable.length + 1;
	if (user)
		RequestsTable.requestsTable[i]["user"] = user;
	if (subject)
		RequestsTable.requestsTable[i]["subject"] = subject;
	if (description)
		RequestsTable.requestsTable[i]["description"] = description;
	if (status)
		RequestsTable.requestsTable[i]["status"] = status;
	if (priority)
		RequestsTable.requestsTable[i]["priority"] = priority;
	if (createdOn)
		RequestsTable.requestsTable[i]["createdOn"] = createdOn;
	return 1;
}

export function getAllRequests() {
	return RequestsTable.requestsTable;
}

export function getRequest(req_id) {
	const i = getRequestsIndex(req_id);
	return RequestsTable.requestsTable[i];
}

export function getUserRequests(user_id) {
	let userRequests = [];
	if (user_id > 0 && user_id <= UsersTable.usersTable.length + 1) {
		for (var i = 0; i < RequestsTable.requestsTable.length; i++) {
			if (RequestsTable.requestsTable[i].user === user_id) {
				userRequests.push(RequestsTable.requestsTable[i]);
			}
		}
		return userRequests;
	}
	else {
		// throw "Invalid User ID";
	}
}

