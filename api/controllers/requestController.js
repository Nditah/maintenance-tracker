
//import * as model from '../models/requestModel';
//import {create_request} from '../models/requestModel';
import {client, pool} from '../config/dbConnect'
import {callback} from '../middlewares/helperLibrary'
import {validateString, validateEmail, validateNumber, hash} from '../middlewares/helperLibrary'


export function getRequestAll(req, res, next) {
    const results = [];
    try {
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
                data: results
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            message: err
        });
    }
}

export function getRequestOne(req, res, next) {
    const request_id = validateNumber(req.params.id, res);
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
            data: results
        });
    });
}


export function getRequestUser(req, res, next) {
    const userId = validateNumber(req.headers['userId'], res);
    console.log("Request header info: " + req.headers);
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
            data: results
        });
    });
}


export function postRequestCreate(req, res, next) {
    const data = req.body;
    const userId = validateNumber(data.userId, res);
    const subject = validateString(data.subject, res);
    const description = validateString(data.description, res);
    const priority = validateString(data.priority, res);

    const text = `INSERT INTO tbl_request (userId, rsubject, rdescription, rpriority) 
              VALUES($1, $2, $3, $4 ) RETURNING * `;
    const values = [userId, subject, description, priority];
    client.query(text, values)
        .then(result => {
            const newRequest = result.rows[0];
            console.log("\r\n\r\nCreating Object from controller" + JSON.stringify(newRequest));
            if (newRequest) {
                return res.status(200).json({
                    message: `New request has been created `,
                    data: newRequest
                });
            }
            else {
                return res.status(404).json({
                    message: `Could not create request `,
                    data: null
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: err
            });
        });
}

export function putRequestUpdate(req, res, next) {
    const data = req.body;
    const id = parseInt(req.params.id, res);
    const userId = validateNumber(data.user, res);
    const subject = validateString(data.subject, res);
    const description = validateString(data.description, res);
    const status = validateString(data.status, res);
    const priority = validateString(data.priority, res);

    // SQL Query > Update Data
    const sql = `UPDATE tbl_request SET userId=($1), rsubject=($2), rdescription=($3),
     rpriority=($5) WHERE id=($6) AND rstatus='pending' `;
    const values = [userId, subject, description, status, priority, id];
    client.query(sql, values)
        .then(result => {
            const output = result.rowCount;
            return res.status(200).json({
                message: `rows affected #${output} on maintenance tracker DB`,
                data: output
            });
            //console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: err
            });
        });
}


export function putRequestApprove(req, res, next) {
    const id = parseInt(req.params.id, res);
    const sql = `UPDATE tbl_request SET rstatus='approve' WHERE id=${id} AND rstatus='pending' `;
    client.query(sql)
        .then(result => {
            const output = result.rowCount;
            return res.status(200).json({
                message: `rows affected #${output} on maintenance tracker DB`,
                data: output
            });
            //console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({
                message: err
            });
        });
}

export function putRequestDisapprove(req, res, next) {
    const id = parseInt(req.params.id, res);
    const sql = `UPDATE tbl_request SET rstatus='disapprove' WHERE id=${id} AND rstatus='pending' `;
    client.query(sql)
        .then(result => {
            const output = result.rowCount;
            return res.status(200).json({
                message: `rows affected #${output} on maintenance tracker DB`,
                data: output
            });
            //console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({
                message: err
            });
        });
}

export function putRequestResolve(req, res, next) {
    const id = parseInt(req.params.id, res);
    const sql = `UPDATE tbl_request SET rstatus='resolve' WHERE id=${id} AND (rstatus='pending' OR rstatus='approve') `;
    client.query(sql)
        .then(result => {
            const output = result.rowCount;
            return res.status(200).json({
                message: `rows affected #${output} on maintenance tracker DB`,
                data: output
            });
            //console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({
                message: err
            });
        });
}

export function deleteRequest(req, res, next) {
    const data = req.body;
    const id = validateNumber(data.id, res);

    // SQL Query > Update Data
    const sql = `DELETE FROM tbl_request WHERE id=${id} AND rstatus='pending' `;
    client.query(sql)
        .then(result => {
            const output = result.rowCount;
            return res.status(200).json({
                message: `rows affected #${output} on maintenance tracker DB`,
                data: output
            });
            //console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({
                message: err
            });
        });
}


