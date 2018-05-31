/*
* Model.js connects to the database 
* and manages the entity.
* functions are exported to server.js
* to serve as callback for the api methods
*/

import {client} from '../config/dbConnect'
import {hash} from '../middlewares/helperLibrary'


exports.create = function(name, email, password, cb) {
  var user = {
    name: name,
    email: email,
    password: hash(password),
  }

  db.save(user, cb)
}

exports.get = function(id, cb) {
  db.fetch({id:id}, function(err, docs) {
    if (err) return cb(err)
    cb(null, docs[0])
  })
}

exports.authenticate = function(email, password) {
  db.fetch({email:email}, function(err, docs) {
    if (err) return cb(err)
    if (docs.length === 0) return cb()

    user = docs[0]

    if (user.password === hash(password)) {
      cb(null, docs[0])
    } else {
      cb()
    }
  })
}

exports.changePassword = function(id, password, cb) {
  db.update({id:id}, {password: hash(password)}, function(err, affected) {
    if (err) return cb(err)
    cb(null, affected > 0)
  })
}