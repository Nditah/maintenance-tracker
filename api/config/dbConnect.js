/*
* Database Connection file
* Import PostgreSql Connector and Enviromental Variables
*/

import env from 'dotenv'
env.config();
import pg from 'pg';
import {hash} from './../middlewares/helperLibrary'
// import { Client, Pool } from 'pg'

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl:true
};

const client = new pg.Client(config);
client.connect( (err) => {
    if(err) {
        console.error('error connecting', err.stack);  
    } else {
        console.log('DB client connected')
    }
})

const pool = new pg.Pool(config);
pool.connect()
.then(client => {
    console.log('DB Pool connected')
})
.catch(err => console.error('error connecting', err.stack))
.then( () => pool.end())


const createDatabase = ()  => {
    const password = hash('pass')
    const sql = `

        -- User table;
        DROP TABLE IF EXISTS tbl_user;
        CREATE TABLE tbl_user (
            id SERIAL PRIMARY KEY,
            utype VARCHAR(20) DEFAULT 'user',
            uemail VARCHAR(100) NOT NULL UNIQUE,
            upassword VARCHAR(200) NOT NULL ,
            ufirstName VARCHAR(200),
            ulastName VARCHAR(200),
            uphone VARCHAR(15),
            uaddress VARCHAR(500),
            ucreatedOn DATE DEFAULT Now()
        );
        
        INSERT INTO tbl_user (utype, uemail, upassword, ufirstName, ulastName, uphone, uaddress )
            VALUES ('admin', 'admin@andela.com', '${password}', 'Scott', 'Tiger', '123-456-777', 'Upper Str.' );
        
        
        -- Request table;
        DROP TABLE IF EXISTS tbl_request;
        CREATE TABLE tbl_request (
            id SERIAL PRIMARY KEY,
            userId INTEGER NOT NULL ,
            rsubject VARCHAR (200) NOT NULL,
            rdescription VARCHAR(1000),
            rstatus VARCHAR(20) DEFAULT 'pending',
            rpriority VARCHAR(20) DEFAULT 'low',
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

/// I run this once to create and seed my heroku db
/*
try{
    createDatabase();
} catch (err) {
    console.log(err);
}
 */

export { client, pool };
