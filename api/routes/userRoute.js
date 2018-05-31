import express from 'express'
const user_route = express.Router();

// Require controller modules.
import {index} from '../controllers/userController'
import {postLogin, postSignup} from '../controllers/userController'
import {getUserOne, getUserAll} from '../controllers/userController'
import {putUpdateUser} from '../controllers/userController'
import {verifyToken} from './../middlewares/userAuthentication'

/// USER ROUTES /// 

// GET user home page.
user_route.get('/', index);

// auth/login Login a user
user_route.post('/auth/login', postLogin);

// POST Register a user
user_route.post('/auth/signup', postSignup);


// PUT request to update User.
user_route.put('/users/:userId([0-9]+)/update', putUpdateUser);

// GET request for one User.
user_route.get('/users/:userId([0-9]+)', verifyToken, getUserOne);

// GET request for list of all User items.
user_route.get('/users', getUserAll);

module.exports = user_route;
