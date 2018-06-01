import express from 'express'
const userRoute = express.Router();

// Require controller modules.
import {postLogin, postSignup} from '../controllers/userController'
import {getUserOne, getUserAll} from '../controllers/userController'
import {putUpdateUser} from '../controllers/userController'
import {verifyToken} from './../middlewares/userAuthentication'

/// USER ROUTES /// 

// auth/login Login a user
userRoute.post('/auth/login', postLogin);

// POST Register a user
userRoute.post('/auth/signup', postSignup);


// PUT request to update User.
userRoute.put('/users/:userId([0-9]+)/update', verifyToken, putUpdateUser);

// GET request for one User.
userRoute.get('/users/:userId([0-9]+)', getUserOne);

// GET request for list of all User items.
userRoute.get('/users', getUserAll);

module.exports = userRoute;
