const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate user
exports.authuser = (req, res, next) => {
  try {
    console.log('🚀 authuser middleware triggered');

    // Prefer header token over cookie
    const token =
      (req.headers.authorization && req.headers.authorization.split(' ')[1]) ||
      req.cookies?.token;

    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.secretekey);
    req.user = verified;

    console.log('✅ Authenticated user:', req.user);
    next();
  } catch (err) {
    console.log('❌ Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Middleware for role-based authorization
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log('🔐 authorizeRoles triggered');
    console.log('User from token:', req.user);
    console.log('Allowed roles:', roles);

    if (!req.user) {
      return res.status(401).json({ message: 'Please log in first' });
    }

    // Normalize usertype to lowercase
    const userType = req.user.usertype.trim().toLowerCase();

    if (!roles.map(r => r.toLowerCase()).includes(userType)) {
      console.log(`❌ Access denied. User type: "${userType}", allowed: ${roles}`);
      return res.status(403).json({ message: 'Access denied' });
    }

    console.log('✅ Role authorized');
    next();
  };
};
