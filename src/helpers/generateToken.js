import jwt from 'jsonwebtoken';

// Function to get a token from jwt
export const getToken = (user) => {
  return jwt.sign({ data: user, expiresIn: '2h' }, process.env.SECRET_KEY)
};
