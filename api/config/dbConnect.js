/*
* 
*
*/

import env from 'dotenv'
env.config();
import pg from 'pg';
// import { Client, Pool } from 'pg'

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl:true
};

// console.log(config);

// const client = new Client({ connectionString: process.env.DB_URI });

const client = new pg.Client(config);
client.connect( (err) => {
    if(err) {
        console.error('error connecting', err.stack);  
    } else {
        console.log('connected')
        // client.end()
    }
})

const pool = new pg.Pool(config);
pool.connect()
.then(client => {
    console.log('connected')
    // client.release()
})
.catch(err => console.error('error connecting', err.stack))
.then( () => pool.end())


function createDatabase() {
    const sql = `

        -- User table;
        DROP TABLE IF EXISTS tbl_user;
        CREATE TABLE tbl_user (
            id SERIAL PRIMARY KEY,
            utype VARCHAR(20),
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
            id SERIAL PRIMARY KEY,
            userId INTEGER NOT NULL ,
            rsubject VARCHAR (200) NOT NULL,
            rdescription VARCHAR(1000),
            rstatus VARCHAR(20),
            rpriority VARCHAR(20),
            rcreatedOn DATE DEFAULT Now()
        );
        
        INSERT INTO tbl_request (userId, rsubject, rdescription, rstatus, rpriority)
        VALUES (1, 'Ravepay Error', 'Payment error resulting from faulty api', 'pending', 'low' );


        -- Token table;
        DROP TABLE IF EXISTS tbl_token;
        CREATE TABLE tbl_token (
            id SERIAL PRIMARY KEY,
            userId INTEGER NOT NULL ,
            token VARCHAR(200) NOT NULL ,
            createdOn DATE DEFAULT Now()
        );
        INSERT INTO tbl_token (id, userId, token)
        VALUES (1, 1, 'user-harsh-256-crypt-token');   
        
        -- End
        `;

    client
        .query(sql)
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

/*
try{
    createDatabase();
} catch (err) {
    console.log(err);
}
*/

module.exports = { client, pool }


