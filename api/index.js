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
