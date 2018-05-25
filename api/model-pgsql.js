/*
I learnt this from a simple tutorial at:
https://docs.microsoft.com/en-us/azure/postgresql/connect-nodejs

*/

const pg = require('pg');

const Host = "ec2-54-217-208-52.eu-west-1.compute.amazonaws.com";
const Database = "d8d2grf4h559oa";
const User = "bfxyknabiikqnx";
const Port = "5432";
const Password = "4597af2a1387cf3aee62700919239a43ecba83a1e82738add365007348b7f06c";
const URI = "postgres://bfxyknabiikqnx:4597af2a1387cf3aee62700919239a43ecba83a1e82738add365007348b7f06c@ec2-54-217-208-52.eu-west-1.compute.amazonaws.com:5432/d8d2grf4h559oa";


const config = {
    host: Host,
    user: User,
    password: Password,
    database: Database,
    port: 5432,
    ssl: true
};

const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
    else {
        // Ok. Every thing is cool here   
        //   createDatabase();
    }
});

let requestRecord = { "id": 0, "user": 0, "subject": "", "description": "", "status": "Pending", "priority": "Normal", "createdOn": "" };

function createDatabase() {
    const query = `

    -- User table;
    DROP TABLE IF EXISTS tbl_user;
    CREATE TABLE tbl_user (
        ID SERIAL PRIMARY KEY,
        uTYPE VARCHAR(20),
        uemail VARCHAR(100) NOT NULL ,
        upassword VARCHAR(200) NOT NULL ,
        ufirstName VARCHAR(200),
        ulastName VARCHAR(200),
        uphone VARCHAR(15),
        uaddress VARCHAR(500),
        ucreatedOn DATE DEFAULT Now()
      );
      
      INSERT INTO tbl_user (utype, uemail, upassword, ufirstName, ulastName, uphone, uaddress )
        VALUES ('admin', 'admin@andela.com', 'pass', 'Scott', 'Tiger', '123-456-777', 'Upper Str.' );
      
      
      -- Request table;
      DROP TABLE IF EXISTS tbl_request;
      CREATE TABLE tbl_request (
        ID SERIAL PRIMARY KEY,
        userId INTEGER NOT NULL ,
        rsubject VARCHAR (200) NOT NULL,
        rdescription VARCHAR(1000),
        rstatus VARCHAR(20),
        rpriority VARCHAR(20),
        rcreatedOn DATE DEFAULT Now()
      );
      
      INSERT INTO tbl_request (userId, rsubject, rdescription, rstatus, rpriority)
      VALUES (1, 'Ravepay Error', 'Payment error resulting from faulty api', 'pending', 'low' );
    `;

    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}

async function createRequest(request, response) {
    // create new user objects
    const data = request.body;
    const userId = parseInt(data.user) || 1;
    const rsubject = data.subject || "unspecified" ;
    const rdescription = data.description || "";
    const rstatus = data.status || "pending";
    const rpriority = data.priority || "low";

    // Parameterized query
    const text = `INSERT INTO tbl_request (userId, rsubject, rdescription, rstatus, rpriority)
                    VALUES($1, $2, $3, $4, $5) RETURNING * `;
    const values = [userId, rsubject, rdescription, rstatus, rpriority];
    /*
    // 1. callback
    client.query(text, values, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            const reply = res.rows[0];
            console.log(reply);
        }
    })
   
    // 3. async/await
    try {
        const res = await pool.query(text, values)
        const reply = res.rows[0];
            console.log(reply);
    } catch (err) {
        console.log(err.stack)
    }    
    */

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

    /*
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

        */
}




async function readAllUserRequests(request, response) {
    const userId = 1;
    //console.log(`Running query to PostgreSQL server: ${config.host}`);

    const sql = "SELECT * FROM tbl_request WHERE userId = " + userId + ";";
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
        */
}



function readRequest(requestId) {
    const id = parseInt(requestId);
    console.log(`Running query to PostgreSQL server: ${config.host}`);

    const query = "SELECT * FROM tbl_request WHERE id = " + id + ";";

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
*/

// deleteRequest(requestId);


module.exports = {
    createDatabase,
    createRequest,
    readAllRequests,
    readAllUserRequests,
    readRequest,
    updateRequest,
    deleteRequest
}