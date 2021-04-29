import jwt from 'jsonwebtoken';

// Generating new token
// for (logged in user or registered user)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });
};

export default generateToken;
