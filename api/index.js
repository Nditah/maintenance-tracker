var express = require('express');
var pg = require("pg");
var app = express();
 
var connectionString = "    postgres://bfxyknabiikqnx:4597af2a1387cf3aee62700919239a43ecba83a1e82738add365007348b7f06c@ec2-54-217-208-52.eu-west-1.compute.amazonaws.com:5432/d8d2grf4h559oa";
 
app.get('/', function (req, res, next) {
    pg.connect(connectionString,function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query('SELECT * FROM tbl_request where id = $1', [1],function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });
});
 
app.listen(3000, function () {
    console.log('Server is running.. on Port 3000');
});

/*
//Now we can set up the route handlers in index.js:

var express = require('express');
var router = express.Router();

var db = require('./queries');


router.get('/api/requests', db.getAllrequests);
router.get('/api/requests/:id', db.getSingleRequest);
router.post('/api/requests', db.createRequest);
router.put('/api/requests/:id', db.updateRequest);
router.delete('/api/requests/:id', db.removeRequest);


module.exports = router;
*/