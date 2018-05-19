

const assert = require('chai').assert;
var expect  = require('chai').expect;
var request = require('request');

//const server = require('../server');

//const today = server.today();



it('Main page content', function(done) {
  request('http://localhost:3000' , function(error, response, body) {
      expect(body).to.equal('Hello World');
      done();
  });
});

it('Main page status', function(done) {
  request('http://localhost:3000' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
  });
});

it('About page content', function(done) {
  request('http://localhost:3000/user' , function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
  });
});



describe('Basic Mocha String Test', function () {
 it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 4);
    });

 it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});

/*
// Test Lib Functions
describe("Server", function() {
  it('server should return 2018-05-17', function() {
    assert.equal(today(), '2018-05-17');
  });
});



// Test Users Functions
describe("getUserIndex", function() {
  it('getUserIndex should return 1', function() {
    assert.equal(getUserIndex(2), 1);
  });
});

// Test Users Functions
describe("updateUser", function() {
  it('updateUser should return 1', function() {
    const id=0 ;
    const type='';
    const email='';
    const password=''; 
    const firstName=''; 
    const lastName=''; 
    const phone=''; 
    const address='';
    const createdOn ='';  
    let result = updateUser(id, type, email, password, firstName, lastName, phone, address, createdOn )
    assert.equal(result, 1);
  });
});

describe("getAllUsers", function() {
  it('getAllUsers should return 3', function() {
    let result = getAllUsers().length;
    assert.equal(result, 3);
  });
});

describe("getUser", function() {
  it('getUser should return 2', function() {
    let result = getUser(2).id;
    assert.equal(result, 2);
  });
});

describe("isUser", function() {
  it('isUser should return true', function() {
    let result = isUser('user@andela.com', 'pass');
    assert.equal(result, true);
  });
});


// Test Requests functions

describe("getRequestsIndex", function() {
  it('getRequestsIndex should return 2', function() {
    let result = getRequestsIndex(3);
    assert.equal(result, 2);
  });
});

describe("updateRequest", function() {
  it('updateRequest should return 1', function() {
    const id=0 ;
    const user='';
    const subject='';
    const description=''; 
    const status=''; 
    const priority=''; 
    const createdOn='';  
    let result = updateRequest(id, user, subject, description, status, priority, createdOn)
    assert.equal(result, 1);
  });
});

describe("getAllRequests", function() {
  it('getAllRequests should return 8', function() {
    let result = getAllRequests();
    let len = result.length;
    assert.typeOf(result, 'object');
  });
});

describe("getRequest", function() {
  it('getRequest should return 3', function() {
    let result = getRequest(3).id;
    assert.equal(result, 3);
  });
});


describe("createRequest", function() {
  it('createRequest should return 1', function() {
    const user='';
    const subject='';
    const description=''; 
    const status=''; 
    const priority=''; 
    const createdOn=''; 
    let result = createRequest(user, subject, description, status, priority, createdOn )
    assert.equal(result, 1);
  });
});


describe("getUserRequests", function() {
  it('getUserRequests should return 3', function() {
    let result = getUserRequests(1).length;
    assert.equal(result, 3);
  });
});


describe('Maintenance App Api Server', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:5000', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

// GET /users/requests Fetch all the requests of a logged in user
describe('Fetch all the requests of a logged in user 1', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:5000/users/requests', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});


//GET /users/requests/<requestId> Fetch a request that belongs to a logged in user
describe(' Fetch a request that belongs to a logged in user 1', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:5000/users/requests/2', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});


//POST /users/requests Create a request.
describe('Create a request by a logged in user 1', () => {
  it('should return 200', done => {
    http.post('http://127.0.0.1:5000/users/requests/', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});


// PUT /users/requests/<requestId> Modify a request.
describe('Modify a request by a logged in user 1', () => {
  it('should return 200', done => {
    http.put('http://127.0.0.1:5000/users/requests/3', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

*/