

const assert = require('chai').assert;
//const server = require('../database');
import { today, isStringOk, isNumberOk  } from "../database";
import { isUser, getUser, getAllUsers, updateUser, getUserIndex  } from "../database";
import { getRequestsIndex, updateRequest, getAllRequests } from "../database";
import { getRequest, createRequest, getUserRequests  } from "../database";


// Test Lib Functions
describe("Server", function() {
  it('server should return 2018-05-17', function() {
    assert.equal(today(), '2018-05-17');
  });
});

describe("isStringOk", function() {
  it('isStringOk should return true', function() {
    assert.equal(isStringOk("My name"), true);
  });
});

describe("isNumberOk", function() {
  it('isNumberOk should return true', function() {
    assert.equal(isNumberOk(2343), true);
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


 