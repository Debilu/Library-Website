// JWT authentication helper functions
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sctcedenema';

export function signToken(userData) {
  // Customize payload and expiry as needed
  return jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
