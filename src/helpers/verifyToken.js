import jwt from 'jsonwebtoken'
import { NO_CREDENTIALS, ERROR } from '../const/const'

require('dotenv').config()

async function authToken(req, res, next) {

  const authHeader = await req.headers.authorization;
  const token = await authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(403).json({
      message: NO_CREDENTIALS
    })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(404).json({ message: ERROR })
    req.user = user
    console.log(user);
    next();
  })
}

export default authToken;