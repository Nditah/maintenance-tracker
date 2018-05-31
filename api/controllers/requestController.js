
//import * as model from '../models/requestModel';
//import {create_request} from '../models/requestModel';
import {client, pool} from '../config/dbConnect'
import {callback} from '../middlewares/helperLibrary'
import {validateRequest} from '../middlewares/helperLibrary'

function Requesto(userId, subject, description, status, priority) {
    this.userId = userId;
    this.subject = subject;
    this.description = description;
    this.subject = subject;
    this.priority = priority;
  }

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Requests Home Page');
};

// Display list of all Requests.
exports.getRequestAll = function(req, res, next) {
    const results = [];
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM tbl_request ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      //done();
      //return res.json(results);
      return res.status(200).json({
            message: 'all requests records from maintenance tracker api',
            data:results
        });

    });
};

// Display detail page for a specific Request.
exports.getRequestOne = function(req, res, next) {
    const request_id = validateRequest(parseInt(req.params.id), req, res );
    if(!request_id > 0){
        res.statusMessage = "Current request id is invalid. An integer value is expected";
        return res.status(422).json({
                message: `Invalid request ${request_id} `,
                data:results
            });
        
    }
    const results = [];
    // SQL Query > Select Data
    const query = client.query(`SELECT * FROM tbl_request WHERE id=${request_id} ;`);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      //done();
      //return res.json(results);
      return res.status(200).json({
            message: `request #${request_id} record from maintenance tracker api`,
            data:results
        });

    });
};


//3. Fetch all the requests of a logged in user
exports.getRequestUser = function(req, res, next) {
    const userId = parseInt(req.headers['userId']) ;
    console.log("Request header info: " + req.headers)
    if(!userId > 0){
        res.statusMessage = "Current user Id is invalid. An integer value is expected";
        return res.status(422).json({
                message: `Invalid request with userId is ${userId} `,
                data:results
            });
        
    }
    const results = [];
    // SQL Query > Select Data
    const query = client.query(`SELECT * FROM tbl_request WHERE userId=${userId} ;`);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      //done();
      //return res.json(results);
      return res.status(200).json({
            message: `request #${userId} record from maintenance tracker api`,
            data:results
        });

    });
};


// Handle Request create on POST.
exports.postRequestCreate = function(req, res, next) {
    const data = req.body;
    const userId = validateRequest(parseInt(data.userId), req, res) ;
    const subject = validateRequest(data.subject, req, res) ;
    const description = validateRequest(data.description, req, res) ;
    const status = validateRequest(data.status, req, res) ;
    const priority = validateRequest(data.priority, req, res) ;

    const R = new Requesto(userId, subject, description, status, priority);
 
        // Parameterized query
        const text = `INSERT INTO tbl_request (userId, rsubject, rdescription, rstatus, rpriority)
        VALUES($1, $2, $3, $4, $5) RETURNING * `;
        const values = [userId, subject, description, status, priority];

        client.query(text, values)
        .then(result => {
            const newRequest = result.rows[0];
            console.log("\r\n\r\nCreating Object from controller" + JSON.stringify(newRequest));

            if(newRequest) {
             return  res.status(200).json({
                    message: `New request has been created `,
                    data:newRequest
                });
            } else {
                return  res.status(404).json({
                    message: `Could not create request `,
                    data:null
                });
            }
        })
        .catch(e => console.error(e.stack))
};

// Display Request update form on PUT.
exports.putRequestUpdate = function(req, res, next) {
    const data = req.body;
    const id = validateRequest(parseInt(data.id), req, res) ;
    const userId = validateRequest(parseInt(data.user), req, res) ;
    const subject = validateRequest(data.subject, req, res) ;
    const description = validateRequest(data.description, req, res) ;
    const status = validateRequest(data.status, req, res) ;
    const priority = validateRequest(data.priority, req, res) ;

    if(!userId > 0){
        res.statusMessage = "Current request id is invalid. An integer value is expected";
        res.status(422).json({
                message: `Invalid request ${request_id} `,
                data:results
            });
    }

        // SQL Query > Update Data
        const sql = `UPDATE tbl_request SET userId=($1), rsubject=($2), 
        rdescription=($3), rpriority=($5) WHERE id=($6) AND rstatus='pending' `;
        const values = [userId, subject, description, status, priority, id];

        client.query(sql, values)
        .then(result => {
            const output = result.rowCount;
            return res.status(200).json({
                message: `rows affected #${output} on maintenance tracker DB`,
                data:output
            });
            //console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            process.exit();
        });

};


// Display Request approve form on PUT.
exports.putRequestApprove = function(req, res, next) {
    const data = req.body;
    const id = validateRequest(parseInt(data.id), req, res) ;
    const userId = validateRequest(parseInt(data.user), req, res) ;
    const subject = validateRequest(data.subject, req, res) ;
    const description = validateRequest(data.description, req, res) ;
    const status = validateRequest(data.status, req, res) ;
    const priority = validateRequest(data.priority, req, res) ;

    if(!userId > 0){
        res.statusMessage = "Current request id is invalid. An integer value is expected";
        res.status(422).json({
                message: `Invalid request ${request_id} `,
                data:results
            });
    }

        // SQL Query > Update Data
        const sql = `UPDATE tbl_request SET userId=($1), rsubject=($2), 
        rdescription=($3), rpriority=($5) WHERE id=($6) AND rstatus='pending' `;
        const values = [userId, subject, description, status, priority, id];

        client.query(sql, values)
        .then(result => {
            const output = result.rowCount;
            return res.status(200).json({
                message: `rows affected #${output} on maintenance tracker DB`,
                data:output
            });
            //console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            process.exit();
        });

};

// Display Request approve form on PUT.
exports.putRequestDisapprove = function(req, res, next) {
    const data = req.body;
    const id = validateRequest(parseInt(data.id), req, res) ;
    const userId = validateRequest(parseInt(data.user), req, res) ;
    const subject = validateRequest(data.subject, req, res) ;
    const description = validateRequest(data.description, req, res) ;
    const status = validateRequest(data.status, req, res) ;
    const priority = validateRequest(data.priority, req, res) ;

    if(!userId > 0){
        res.statusMessage = "Current request id is invalid. An integer value is expected";
        res.status(422).json({
                message: `Invalid request ${request_id} `,
                data:results
            });
    }

        // SQL Query > Update Data
        const sql = `UPDATE tbl_request SET userId=($1), rsubject=($2), 
        rdescription=($3), rpriority=($5) WHERE id=($6) AND rstatus='pending' `;
        const values = [userId, subject, description, status, priority, id];

        client.query(sql, values)
        .then(result => {
            const output = result.rowCount;
            return res.status(200).json({
                message: `rows affected #${output} on maintenance tracker DB`,
                data:output
            });
            //console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            process.exit();
        });

};

// Display Request delete form on DELETE.
exports.deleteRequest = function(req, res, next) {
    const data = req.body;
    const id = validateRequest(parseInt(data.id), req, res) ;

    if(!id > 0){
        res.statusMessage = "Current request id is invalid. An integer value is expected";
        res.status(422).json({
                message: `Invalid request ${request_id} `,
                data:results
            });
    }

        // SQL Query > Update Data
        const sql = `DELETE FROM tbl_request WHERE id=($6) AND rstatus='pending' `;
        const values = [userId, subject, description, status, priority, id];

        client.query(sql, values)
        .then(result => {
            const output = result.rowCount;
            return res.status(200).json({
                message: `rows affected #${output} on maintenance tracker DB`,
                data:output
            });
            //console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            process.exit();
        });

};


