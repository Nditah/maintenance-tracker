import express from 'express'
const requestRoute = express.Router();

// Require controller modules.
import {index} from '../controllers/requestController'
import {getRequestAll, getRequestOne} from '../controllers/requestController'
import {putRequestDisapprove, putRequestApprove} from '../controllers/requestController'
import {postRequestCreate, putRequestUpdate} from '../controllers/requestController'
import {getRequestUser, deleteRequest} from '../controllers/requestController'
import {verifyToken} from './../middlewares/userAuthentication'


/// REQUEST ROUTES ///


// GET request home page.
requestRoute.get('/', index);

// POST request for creating Request.
requestRoute.post('/users/requests', postRequestCreate);

// DELETE request to delete Request.
requestRoute.delete('/requests/:id([0-9]+)/delete', deleteRequest);

// PUT request to update Request. /requests/<requestId>/disapprove
requestRoute.put('/requests/:id([0-9]+)/update', putRequestUpdate);

// PUT request to update Request. /requests/<requestId>/disapprove
requestRoute.put('/requests/:id([0-9]+)/disapprove', putRequestDisapprove);

// PUT request to update Request. /requests/<requestId>/approve
requestRoute.put('/requests/:id([0-9]+)/approve', putRequestApprove);

// GET request for one Request.
requestRoute.get('/requests/:id([0-9]+)', getRequestOne);

// GET request for list of all Request items.
requestRoute.get('/requests', getRequestAll);

// 3. Fetch all the requests of a logged in user
requestRoute.get('/users/requests', getRequestUser);

export default requestRoute;