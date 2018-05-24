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

var fs = require('fs'); // to read database.json from fs

var databaseFile = fs.readFileSync('database.json');
let database = JSON.parse(databaseFile);

module.exports = database;