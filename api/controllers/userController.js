import {client, pool} from '../config/dbConnect'
import {validateString, validateEmail, validateNumber, hash} from '../middlewares/helperLibrary'
import {jwtAuth} from './../middlewares/userAuthentication'


export function postLogin(req, res) {
    const data = req.body;
    const email = validateEmail(data.email, res);
    const password = validateString(data.password, res);
    const pass = hash(password);
    const utype = validateString(data.utype, res);
    // SELECT COUNT(id)
    const sql = `SELECT * FROM tbl_user WHERE uemail='${email}' AND upassword='${pass}' AND utype='${utype}' ;`;
    client.query(sql)
        .then(result => {
            if (result.rowCount === 1) {
                const user = {
                    id: result.rows[0].id,
                    type: result.rows[0].utype,
                    email: result.rows[0].uemail,
                    firstName: result.rows[0].ufirstName,
                    lastName: result.rows[0].ulastName,
                    phone: result.rows[0].uphone,
                    address: result.rows[0].uaddress,
                    createdon: result.rows[0].ucreatedOn
                };  
               // console.log(`Login user record: ${JSON.stringify(result.rows)} \r\n JwtUser ${JSON.stringify(user)} `);
                jwtAuth(user, res);
            } else {
                return res.status(200).json({
                    message: 'Incorrect login credentials'
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({
                message: err
            });
        });
}


export function postSignup(req, res) {
    // create new user objects
    const data = req.body;
    const firstName = validateString(data.firstName, res);
    const lastName = validateString(data.lastName, res);
    const phone = validateString(data.phone, res);
    const address = validateString(data.address, res);
    const email = validateEmail(data.email, res);
    const password = validateString(data.password, res);
    const password2 = validateString(data.password2, res);
    const pass = hash(password);
    if (password !== password2) {
        return res.status(422).json({
            message: `Invalid request. The input password(s) do not match`,
            data: password
        });
    }

    // Parameterized query
    const text = `INSERT INTO tbl_user (uemail, upassword, ufirstName, ulastName, uphone, uaddress ) 
                    VALUES($1, $2, $3, $4, $5, $6) RETURNING * `;
    const values = [email, password, firstName, lastName, phone, address];
    client.query(text, values)
        .then(result => {
            const newUser = result.rows[0];
            console.log("\r\n\r\nCreating Object from controller" + JSON.stringify(newUser));
            if (newUser) {
                return res.status(200).json({
                    message: `New user is created successfully `,
                    data: { name: newUser.firstName + ' ' + newUser.lastName }
                });
            }
            else {
                return res.status(404).json({
                    message: `Could not create user `,
                    data: null
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({
                message: err
            });
        });
}
        

export function getUserAll(req, res, next) {
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
            message: 'all requests records from maintenance tracker api',
            data: results
        });
    });
}

export function getUserOne(req, res, next) {
    const results = [];
    const userId = validateNumber(req.params.userId, res);
 
    // SQL Query > Select Data
    const query = client.query(`SELECT * FROM tbl_user WHERE id=${userId} ;`);
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
            data: results
        });
    });
}


export function putUpdateUser(req, res, next) {
    const data = req.body;
    const userId = validateNumber(req.params.id, res);
    const utype = validateString(data.utype, res);
    const firstName = validateString(data.firstName, res);
    const lastName = validateString(data.lastName, res);
    const phone = validateString(data.phone, res);
    const address = validateString(data.address, res);
    const email = validateEmail(data.email, res);
    const password = validateString(data.password, res);

    // SQL Query > Update Data
    const text = `UPDATE tbl_user SET utype=($1), firstName=($2), lastName=($3), 
                phone=($4), address=($5), email=($6), password=($7) WHERE id=($8) `;
    const values = [utype, firstName, lastName, phone, address, email, password, userId];

    client.query(text, values)
        .then(result => {
            const reply = result.rowCount;
            res.send(`Rows affected: ${reply}`);
            console.log(`Rows affected: ${reply}`);
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({
                message: err
            });
        });
}
