//import * as user_model from '../models/requestModel';
import {client, pool} from '../config/dbConnect'
import {validateRequest, validateEmail, hash} from '../middlewares/helperLibrary'
import {jwtAuth} from './../middlewares/userAuthentication'

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: User Site Home Page');
};

// Handle User create on POST.
exports.postLogin = (req, res) => {
    const data = req.body;
    const email = validateEmail(data.email, req, res) ;
    const password = validateRequest(data.password, req, res) ;
    const utype = validateRequest(data.utype, req, res) ;

    const sql = `SELECT * FROM tbl_user WHERE uemail='${email}' AND upassword='${password}' AND utype='${utype}' ;`;

    client.query(sql)
        .then(result => {
            if(result) { 
            const user = {
                id: 1,
                type: utype,
                email: email/*,
                firstName: result.ufirstName,
                lastName: result.ulastName,
                phone: result.uphone,
                address: result.uaddress,
                createdOn: result.ucreatedOn*/
            }
            
            console.log(`Login user record: ${result} \r\n JwtUser ${user} `);

            jwtAuth(user, res);
        }

        })
        .catch(err => {
            console.log(err);
            throw err;
        });

};


// Handle User create on POST.
exports.postSignup = function(req, res) {
   // create new user objects
   const data = req.body;
   const firstName = validateRequest(data.firstName, req, res) ;
   const lastName = validateRequest(data.lastName, req, res) ;
   const phone = validateRequest(data.phone, req, res) ;
   const address = validateRequest(data.address, req, res) ;
   const email = validateEmail(data.email, req, res) ;
   const password = validateRequest(data.password, req, res) ;
   const password2 = validateRequest(data.password2, req, res) ;
   
   if(password !== password2 ){
        return res.status(422).json({
            message: `Invalid request. The input password(s) do not match`,
            data:password
        });
    }
    /*
    if(!(validateEmail(email))){
        return res.status(422).json({
            message: `Invalid email address.`,
            data:email
        });
    }
    */

    const utype = 'user'; // admin 
    // Parameterized query
    const text = `INSERT INTO tbl_user (utype, uemail, upassword, ufirstName, ulastName, uphone, uaddress )
                    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * `;
    const values = [utype, email, password, firstName, lastName, phone, address];
   
   client.query(text, values)
   .then(result => {
       const newUser = result.rows[0];
       console.log("\r\n\r\nCreating Object from controller" + JSON.stringify(newUser));

       if(newUser) {
        return  res.status(200).json({
               message: `New user is created successfully `,
               data:{ name:newUser.firstName }
           });
       } else {
           return  res.status(404).json({
               message: `Could not create user `,
               data:null
           });
       }
   })
   .catch(e => console.error(e.stack))
};
        

// Display list of all Users.
exports.getUserAll = (req, res, next) => {
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
exports.getUserOne = (req, res, next) => {
    const results = [];
    const userId = validateRequest(parseInt(req.params.userId), req, res );
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
exports.putUpdateUser = (req, res) => {
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