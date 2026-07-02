import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  // Expect "Bearer <token>" format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token format must be Bearer <token>' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey123!');
    req.user = decoded; // Bind decoded payload containing user ID
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid or expired', error: err.message });
  }
};
