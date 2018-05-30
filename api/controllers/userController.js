//import * as user_model from '../models/requestModel';
import {client, pool} from '../config/dbCon'
import {validate_req} from '../middlewares/lib'
// import jwt from 'jsonwebtoken'
import jwtAuth from './../middlewares/auth'

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: User Site Home Page');
};

// Handle User create on POST.
exports.login = (req, res) => {
    const user = {
        id: 1,
        utype: 'admin',
        uemail: 'user@andela.com' ,
        upassword: 'passward' ,
        ufirstName: 'Fred',
        ulastName: 'Edward',
        uphone: '08025532383',
        uaddress: 'Agungi, Lekki, Lagos',
        ucreatedOn: '2018-12-27'
    }

    jwtAuth(user, res);
    /*
    jwt.sign({user}, 'secretKey', { expiresIn: '30s'}, (err, token) => {
        res.json({token});
    });
    */
};

// Handle User create on POST.
exports.signup = function(req, res) {
    res.send('NOT IMPLEMENTED: User Signup');
};
        

// Display list of all Users.
exports.user_all = (req, res, next) => {
    const results = [];
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM tbl_user ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      //done();
      //return res.json(results);
      return res.status(200).json({
            message: 'all user records from maintenance tracker api',
            data:results
        });

    });
};

// Display detail page for a specific User.
exports.user_one = (req, res, next) => {
    const results = [];
    const userId = validate_req(parseInt(req.params.userId), req, res );
    if(!userId > 0){
        res.statusMessage = "Current request id is invalid. An integer value is expected";
        return res.status(422).json({
                message: `Invalid request ${userId} `,
                data:results
            });
        
    }
    // SQL Query > Select Data
    const query = client.query(`SELECT * FROM tbl_user WHERE id=${userId} ;`)
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      //done();
      //return res.json(results);
      return res.status(200).json({
            message: 'all user records from maintenance tracker api',
            data:results
        });

    });
};


// Display User update form on PUT.
exports.update_user = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.status(200).json({
                message: 'User profile updated...',
                data:authData
            });
        }
    });

};


/*

async function createRequest(request, response) {
    // create new user objects
    const data = request.body;
    const userId = parseInt(data.user) ;
    const rsubject = data.subject || "unspecified" ;
    const rdescription = data.description || "";
    const rstatus = data.status || "pending";
    const rpriority = data.priority || "low";

    // Parameterized query
    const text = `INSERT INTO tbl_request (userId, rsubject, rdescription, rstatus, rpriority)
                    VALUES($1, $2, $3, $4, $5) RETURNING * `;
    const values = [userId, rsubject, rdescription, rstatus, rpriority];
    
    // 3. async/await
    try {
        const res = await pool.query(text, values)
        const reply = res.rows[0];
            console.log(reply);
    } catch (err) {
        console.log(err.stack)
    }    
   

    // 2. promise
    client.query(text, values)
        .then(res => {
            const reply = res.rows[0];
            response.send(reply);
            console.log(reply);
        })
        .catch(e => console.error(e.stack))

}

async function readAllRequests(request, response) {

    //console.log(`Running query to PostgreSQL server: ${config.host}`);

    const sql = 'SELECT * FROM tbl_request;';

    const { rows } = await client.query(sql)
    response.send(JSON.stringify(rows));

    //*
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
    /*
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
        const userId = parseInt(request.body.user); // Authentication and Userization

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
         const userId = parseInt(request.body.user); // Authentication and Userization
 
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
         const userId = parseInt(request.body.user); // Authentication and Userization
 
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


PUT /requests/<requestId>/approve
Approve request This is available only to admin users. 
When this endpoint is called, the status of the request should be pending.

PUT /requests/<requestId>/disapprove
Disapprove request This is available only to admin users.

PUT /requests/<requestId>/resolve
Resolve request This is available only to admin users.


// deleteRequest(requestId);


module.exports = {
    createRequest,
    readAllRequests,
    readAllUserRequests,
    readRequest,
    updateRequest,
    updateRequestAdmin,
    approveRequest,
    disapproveRequest,
    resolveRequest,
    deleteRequest
}

*/