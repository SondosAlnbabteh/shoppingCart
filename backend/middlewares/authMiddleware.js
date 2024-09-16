const jwt = require('jsonwebtoken');

// Secret for JWT (store securely in environment variables)
const jwtSecret = '12345';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from cookies or authorization header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach the decoded token data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


module.exports = {
  verifyToken,

};
