import express from 'express'
const user_route = express.Router();

// Require controller modules.
import {index} from '../controllers/userController'
import {login, signup} from '../controllers/userController'
import {user_one, user_all} from '../controllers/userController'
import {update_user} from '../controllers/userController'
import {verifyToken} from './../middlewares/auth'

/// USER ROUTES /// 

// GET user home page.
user_route.get('/', index);

// auth/login Login a user
user_route.post('/auth/login', login);

// POST Register a user
user_route.post('/auth/signup', signup);


// PUT request to update User.
user_route.put('/users/:userId([0-9]+)/update', verifyToken, update_user);

// GET request for one User.
user_route.get('/users/:userId([0-9]+)', verifyToken, user_one);

// GET request for list of all User items.
user_route.get('/users', verifyToken, user_all);

module.exports = user_route;
