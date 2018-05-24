module.exports = {

	// current date YYYY-MM-DD
	today : function () {
		return new Date().toJSON().slice(0, 10);
	},

		// House-keeping for strings
	isStringOk : function (val) {
		if (val.length > 0 && val != undefined && val != null) {
			return true;
		} {
			return false;
		}
	},

		// House-keeping for numbers
	isNumberOk : function (val) {
		if (val > 0 && val != undefined && val != null) {
			return true;
		} {
			return false;
		}
	},



	// UsersTable: Array<{ id: number, type: string, email: string, password: string,  firstName: string,  lastName: string,  phone: string, address: string, createdOn: date }>;
	UsersTable : [
		{ "id": 1, "type": "admin", "email": "admin@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-09" },
		{ "id": 2, "type": "user", "email": "user@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-10" },
		{ "id": 3, "type": "user", "email": "sam@andela.com", "password": "pass", "firstName": "Samweld", "lastName": "Nditah", "phone": "123-456-777", "address": "Epic Tower", "createdOn": "2018-05-12" }
	],

//	userRecord = { "id": 0, "type": "user", "email": "", "password": "", "firstName": "", "lastName": "", "phone": "", "address": "", "createdOn": "" },

	getUserIndex : function (userId) {
		if (userId <= this.UsersTable.length + 1) {
			for (var i = 0; i < this.UsersTable.length; i++) {
				if (this.UsersTable[i]["id"] == userId) {
					return i;
				}
			}
		} else {
			// throw "Invalid User ID";
		}
		return -1;
	},

	updateUser : function (id, type, email, password, firstName, lastName, phone, address, createdOn) {
		// get the user index
		const i = this.getUserIndex(id);
		if (type) this.UsersTable[i]["type"] = type;
		if (email) this.UsersTable[i]["email"] = email;
		if (password) this.UsersTable[i]["password"] = password;
		if (firstName) this.UsersTable[i]["firstName"] = firstName;
		if (lastName) this.UsersTable[i]["lastName"] = lastName;
		if (phone) this.UsersTable[i]["phone"] = phone;
		if (address) this.UsersTable[i]["address"] = address;
		if (createdOn) this.UsersTable[i]["createdOn"] = createdOn;

		return 1;
	},


	// ALl Users
	getAllUsers : function () {
		return this.UsersTable;
	},


	// A Particular User
	getUser : function (user_id) {
		const i = this.getUserIndex(user_id);
		return this.UsersTable[i];
	},


	isUser : function (email, password) {
		if (email.length > 4 && password.length > 0) {
			for (var i = 0; i < this.UsersTable.length; i++) {
				if (this.RequestsTable[i]["email"] == email && this.RequestsTable[i]["password"] == password) {
					return true;
				}
			}
			return false;
		} else {
			// throw "Invalid input email or password ";
		}
	},



	// UsersTable: Array<{ id: number, user: number, subject: string, description: string, status: string, priority: string, createdOn: date }>;
	RequestsTable : [
		{ "id": 1, "user": 1, "subject": "Webpay", "description": "Typescript Wrapper", "status": "Pending", "priority": "Low", "createdOn": "2018-05-12" },
		{ "id": 2, "user": 2, "subject": "Erlang Server", "description": "Chat Messenger", "status": "Pending", "priority": "High", "createdOn": "2018-05-02" },
		{ "id": 3, "user": 3, "subject": "Django", "description": "Python framework", "status": "Pending", "priority": "Normal", "createdOn": "2018-05-11" },
		{ "id": 4, "user": 1, "subject": "Java", "description": "Spring JEE", "status": "Pending", "priority": "Low", "createdOn": "2018-05-12" },
		{ "id": 5, "user": 2, "subject": "Rest API", "description": "GraphQL Integration", "status": "Pending", "Normal": "Low", "createdOn": "2018-05-12" },
		{ "id": 6, "user": 3, "subject": "Rust", "description": "Go Rust Speed Test", "status": "Pending", "priority": "High", "createdOn": "2018-05-14" },
		{ "id": 7, "user": 1, "subject": "Andela", "description": "EPIC All the Way", "status": "Pending", "priority": "Low", "createdOn": "2018-05-17" },
		{ "id": 8, "user": 3, "subject": "Samweld", "description": "3Dcoder Top 1%", "status": "Pending", "priority": "High", "createdOn": "2018-05-21" }
	],

	// var uRequest : { "id": 0, "user": 0, "subject": "", "description": "", "status": "Pending", "priority": "Normal", "createdOn": "" },

	getRequestsIndex : function (req_Id) {
		if (req_Id <= this.RequestsTable.length + 1) {
			for (var i = 0; i < this.RequestsTable.length; i++) {
				if (this.RequestsTable[i]["id"] == req_Id) {
					return i;  //this.RequestsTable[i];
				}
			}
		} else {
			// throw "Invalid Request ID";
		}
		return -1;
	},


	updateRequest : function (id, user, subject, description, status, priority, createdOn) {
		// get the user index
		const i = this.getRequestsIndex(id);
		if (user) this.RequestsTable[i]["user"] = user;
		if (subject) this.RequestsTable[i]["subject"] = subject;
		if (description) this.RequestsTable[i]["description"] = description;
		if (status) this.RequestsTable[i]["status"] = status;
		if (priority) this.RequestsTable[i]["priority"] = priority;
		if (createdOn) this.RequestsTable[i]["createdOn"] = createdOn;

		return 1;
	},

	createRequest : function (user, subject, description, status, priority, createdOn = today) {
		// get the user index
		const i = this.RequestsTable.length + 1;
		if (user) this.RequestsTable[i]["user"] = user;
		if (subject) this.RequestsTable[i]["subject"] = subject;
		if (description) this.RequestsTable[i]["description"] = description;
		if (status) this.RequestsTable[i]["status"] = status;
		if (priority) this.RequestsTable[i]["priority"] = priority;
		if (createdOn) this.RequestsTable[i]["createdOn"] = createdOn;

		return 1;
	},

	// All Requests
	getAllRequests : function () {
		return this.RequestsTable;
	},


	// A Particular Request
	getRequest : function (req_id) {
		const i = this.getRequestsIndex(req_id);
		return this.RequestsTable[i];
	},

	// A Particular Request

	getUserRequests : function (user_id) {
		let userRequests = [];
		if (user_id > 0 && user_id <= this.UsersTable.length + 1) {
			for (var i = 0; i < this.RequestsTable.length; i++) {
				if (this.RequestsTable[i]["user"] == user_id) {
					userRequests.push(this.RequestsTable[i])
				}
			}
			return userRequests;
		} else {
			// throw "Invalid User ID";
		}
	}



}

/******  Refactory *******/
// export { Lib, Users, Requests };
// import { Lib, Users, Requests } from './database.js';
