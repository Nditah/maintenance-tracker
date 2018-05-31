//import env from 'dotenv'
import jwt from 'jsonwebtoken'

export function jwtAuth(user, res) {
    // sign with default (HMAC SHA256)
    jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES }, (err, token) => {
        res.json({ token });
    });
    console.log(token);
}

export function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }
    else {
        // Forbidden
        //res.sendStatus(403);
        res.status(403).json({
            message: 'Unauthorized operation detected',
        });
    }
}
