
import http from 'http';
import assert from 'assert';

//import '../index.js';

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