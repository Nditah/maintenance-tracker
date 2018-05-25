var promise = require('bluebird');
const Host = "ec2-54-217-208-52.eu-west-1.compute.amazonaws.com";
const Database = "d8d2grf4h559oa";
const User = "bfxyknabiikqnx";
const Port = "5432";
const Password = "4597af2a1387cf3aee62700919239a43ecba83a1e82738add365007348b7f06c";
const URI = "postgres://bfxyknabiikqnx:4597af2a1387cf3aee62700919239a43ecba83a1e82738add365007348b7f06c@ec2-54-217-208-52.eu-west-1.compute.amazonaws.com:5432/d8d2grf4h559oa";

var options = {
  // Initialization Options
  promiseLib: promise
};




var pgp = require('pg-promise')(options);
var db = pgp(URI);

// add query functions

// GET All Requests
function getAllRequests(req, res, next) {
    db.any('select * from tbl_request')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL Requests'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }
  

//GET Single Request

function getSingleRequest(req, res, next) {
    var reqID = parseInt(req.params.id);
    db.one('select * from tbl_request where id = $1', reqID)
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE Request'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  //POST

function createRequest(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into tbl_request(userId, rsubject, rdescription, rstatus, rpriority)' +
        'values(${userId}, ${rsubject}, ${rdescription}, ${rstatus}, ${rpriority})',
      req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inserted one Request'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  
  // PUT

function updateRequest(req, res, next) {
    db.none('update tbl_request set userId=$1, rsubject=$2, rdescription=$3, rstatus=$4 , rpriority=$5 where id=$5',
      [parseInt(req.body.userId), req.body.rsubject, req.body.rdescription,
        req.body.rstatus, req.body.rpriority, parseInt(req.params.id)])
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Updated Request'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

  // Delete

function removeRequest(req, res, next) {
    var reqID = parseInt(req.params.id);
    db.result('delete from tbl_request where id = $1', reqID)
      .then(function (result) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            message: `Removed ${result.rowCount} Request`
          });
        /* jshint ignore:end */
      })
      .catch(function (err) {
        return next(err);
      });
  }

  


// export

module.exports = {
  getAllRequests: getAllRequests,
  getSingleRequest: getSingleRequest,
  createRequest: createRequest,
  updateRequest: updateRequest,
  removeRequest: removeRequest
};
