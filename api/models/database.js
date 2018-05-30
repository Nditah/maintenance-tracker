
var fs = require('fs'); // to read database.json from fs

var databaseFile = fs.readFileSync('database.json');
let database = JSON.parse(databaseFile);

module.exports = database;