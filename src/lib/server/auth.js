// JWT authentication helper functions
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sctcedenema';
//Create a token using the userdata from api/auth
export function signToken(userData) {
  return jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
}
//Verify if the JWT is valid
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
