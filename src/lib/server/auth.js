// JWT authentication helper functions
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sctcedenema';
//Create a token using the userdata from api/auth
export function signToken(userData) {
  if (!userData?.username) {
    throw new Error('User data must contain a username');
  }
  return jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
}

//Verify if the JWT is valid
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('Invalid token:', err.message); // For debugging
    return null;
  }
}

