import express from 'express'
const request_router = express.Router();

// Require controller modules.
import {index} from '../controllers/requestController'
import {request_all, request_one} from '../controllers/requestController'
import {request_disapprove, request_approve} from '../controllers/requestController'
import {request_create, request_update} from '../controllers/requestController'
import {request_user, request_delete} from '../controllers/requestController'
import {verifyToken} from './../middlewares/auth'


/// REQUEST ROUTES ///


// GET request home page.
request_router.get('/', index);

// POST request for creating Request.
request_router.post('/users/requests', request_create);

// DELETE request to delete Request.
request_router.delete('/requests/:id([0-9]+)/delete', request_delete);

// PUT request to update Request. /requests/<requestId>/disapprove
request_router.put('/requests/:id([0-9]+)/update', request_update);

// PUT request to update Request. /requests/<requestId>/disapprove
request_router.put('/requests/:id([0-9]+)/disapprove', request_disapprove);

// PUT request to update Request. /requests/<requestId>/approve
request_router.put('/requests/:id([0-9]+)/approve', request_approve);

// GET request for one Request.
request_router.get('/requests/:id([0-9]+)', request_one);

// GET request for list of all Request items.
request_router.get('/requests', request_all);

// 3. Fetch all the requests of a logged in user
request_router.get('/users/requests', request_user);

export default request_router;