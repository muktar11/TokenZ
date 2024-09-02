const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'
    if (!token) {
        return res.status(403).json({ error: 'No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token data (including userId) to the request object
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Failed to authenticate token.' });
    }
};
module.exports = authenticate;
