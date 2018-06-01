/*
* Model.js connects to the database 
* and manages the entity.
* functions are exported to server.js
* to serve as callback for the api methods
*/

import {client} from '../config/dbConnect'
import {hash} from '../middlewares/helperLibrary'

