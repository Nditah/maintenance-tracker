import {client, pool} from '../config/dbCon'
import {callback} from '../middlewares/lib'


// Create new request in your database and return its id
exports.create_request = function(request) {
    // create new request objects
    const userId = request.userId;
    const rsubject = request.subject;
    const rdescription = request.description;
    const rstatus = request.status;
    const rpriority = request.priority;

    // Parameterized query
    const text = `INSERT INTO tbl_request (userId, rsubject, rdescription, rstatus, rpriority)
                    VALUES($1, $2, $3, $4, $5) RETURNING * `;
    const values = [userId, rsubject, rdescription, rstatus, rpriority];
   
    client.query(text, values)
        .then(result => {
            const newRequest = result.rows[0];
            console.log(JSON.stringify(newRequest));
            return newRequest;
        })
        .catch(e => console.error(e.stack))
     
}

// Get a particular request
exports.getRequest = function(id, callback) {
  db.fetch({id:id}, function(err, docs) {
    if (err) return callback(err)
    callback(null, docs[0])
  })
}

// Get all requests
export const read_all_requests = () => {
    const sql = 'SELECT * FROM tbl_request;';
    let output  = "";
    const query = client.query(sql);

    query.on("row", function (row, result) {
        result.addRow(row);
    });
    
    query.on("end", function (result) {
        output = JSON.stringify(result.rows, null, "    ")
        console.log("Ouput from callback", output);
        client.end();
        return output;
    });

    /*
    client.query(sql)
        .then(result => {
            const rows = result.rows;
            rows.map(row => {
                output.push(row)
                console.log(`1. Read: ${JSON.stringify(row)}`);
            });
            console.log('2. ' + JSON.stringify(output))
            return JSON.stringify(output);
        })
        .catch(err => {
            console.log(err);
            process.exit();
            // return false;
        });
        */
        console.log("\r\n\r\n\r\n\r\n\r\n\r\n\r\n3. Records ***************************** \n\r")
        //client.end(console.log('Closed client connection'));
    
    
}


// Get all requests by a particular user
exports.getAllRequestByUser = function(user, callback) {
  db.fetch({user: user}, callback)
}

 




/*


async function readAllRequests(request, response) {

    //console.log(`Running query to PostgreSQL server: ${config.host}`);

    const sql = 'SELECT * FROM tbl_request;';

    const { rows } = await client.query(sql)
    response.send(JSON.stringify(rows));

    ///////
    client.query(sql)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                response.send(JSON.stringify(row));
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            //process.exit();
        })
        .catch(err => {
            console.log(err);
        });

        
}




async function readAllUserRequests(request, response) {
    const userId = 1;
    //console.log(`Running query to PostgreSQL server: ${config.host}`);

    const sql = `SELECT * FROM tbl_request WHERE userId = ${userId} ;`;
    const { rows } = await client.query(sql)
    response.send(JSON.stringify(rows));
    //////
    client.query(sql)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            process.exit();
        })
        .catch(err => {
            console.log(err);
        });
        
}



function readRequest(requestId) {
    const id = parseInt(requestId);
    console.log(`Running query to PostgreSQL server: ${config.host}`);

    const query = "SELECT * FROM tbl_request WHERE id = ${id } ;";

    client.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            process.exit();
        })
        .catch(err => {
            console.log(err);
        });
}


// By user
function updateRequest(request, response) {
    // create new user objects
    const data = request.body;
    const id = parseInt(request.params.requestId);
    const userId = parseInt(data.user);
    const rsubject = data.subject;
    const rdescription = data.description;
    const rstatus = data.status || "pending";
    const rpriority = data.priority || "low";

    // SQL Query > Update Data
    const sql = `UPDATE tbl_request SET userId=($1), rsubject=($2), 
                rdescription=($3), rpriority=($5) WHERE id=($6) AND rstatus='pending' `;
    const values = [userId, rsubject, rdescription, rstatus, rpriority, id];

    client.query(sql, values)
        .then(result => {
            const reply = result.rowCount;
            response.send(`Rows affected: ${reply}`);
            console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

// By Admin
function updateRequestAdmin(request, response) {
    // create new user objects
    const data = request.body;
    const id = parseInt(request.params.requestId);
    const userId = parseInt(data.user);
    const rsubject = data.subject;
    const rdescription = data.description;
    const rstatus = data.status || "pending";
    const rpriority = data.priority || "low";

    // SQL Query > Update Data
    const sql ='UPDATE tbl_request SET userId=($1), rsubject=($2), rdescription=($3), rstatus=($4), rpriority=($5) WHERE id=($6)';
    const values = [userId, rsubject, rdescription, rstatus, rpriority, id];

    client.query(sql, values)
        .then(result => {
            const reply = result.rowCount;
            response.send(`Rows affected: ${reply}`);
            console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

 
// '/requests/:requestId/approve' 
function approveRequest(request, response) {
        // create new user objects
        const id = parseInt(request.params.requestId);
        const userId = parseInt(request.body.user); // Authentication and Authorization

        // SQL Query > Update Data
        const sql ="UPDATE tbl_request SET rstatus='approved' WHERE id=($1) AND rstatus='pending' ";
        const values = [ rstatus, id];
    
        client.query(sql, values)
            .then(result => {
                const reply = result.rowCount;
                response.send(`Rows affected: ${reply}`);
                console.log(`Rows affected: ${reply}`);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
}

// '/requests/:requestId/disapprove' 
function disapproveRequest(request, response) {
         // create new user objects
         const id = parseInt(request.params.requestId);
         const userId = parseInt(request.body.user); // Authentication and Authorization
 
         // SQL Query > Update Data
         const sql ="UPDATE tbl_request SET rstatus='rejected' WHERE id=($1) AND rstatus='pending' ";
         const values = [id];
     
         client.query(sql, values)
             .then(result => {
                 const reply = result.rowCount;
                 response.send(`Rows affected: ${reply}`);
                 console.log(`Rows affected: ${reply}`);
             })
             .catch(err => {
                 console.log(err);
                 throw err;
             });   
}

// '/requests/:requestId/resolve' 
function resolveRequest(request, response) {
         // create new user objects
         const id = parseInt(request.params.requestId);
         const userId = parseInt(request.body.user); // Authentication and Authorization
 
         // SQL Query > Update Data
         const sql ="UPDATE tbl_request SET rstatus='resolved' WHERE id=($1) AND rstatus !='rejected' ";
         const values = [id];
     
         client.query(sql, values)
             .then(result => {
                 const reply = result.rowCount;
                 response.send(`Rows affected: ${reply}`);
                 console.log(`Rows affected: ${reply}`);
             })
             .catch(err => {
                 console.log(err);
                 throw err;
             });   
}


function deleteRequest(requestId) {
    const id = parseInt(requestId);
    const query = " DELETE FROM tbl_request WHERE id =" + id + "; ";

    client
        .query(query)
        .then(result => {
            console.log('Delete completed');
            console.log(`Rows affected: ${result.rowCount}`);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

// createDatabase();

// POST /users/requests Create a request.
// createRequest(requestObject);


// Get /requests/ Fetch all the requests.
// readAllRequests(); 

// Fetch all the requests of a logged in user
//GET /users/requests
// readAllUserRequests(userId); 

// Fetch a request that belongs to a logged in user
//GET /users/requests/<requestId>
// readRequest(requestId); 

// PUT /users/requests/<requestId>
// updateRequest(requestObject);

/*
PUT /requests/<requestId>/approve
Approve request This is available only to admin users. 
When this endpoint is called, the status of the request should be pending.

PUT /requests/<requestId>/disapprove
Disapprove request This is available only to admin users.

PUT /requests/<requestId>/resolve
Resolve request This is available only to admin users.



// deleteRequest(requestId);

*/