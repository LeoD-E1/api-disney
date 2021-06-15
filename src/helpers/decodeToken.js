import jwt from 'jsonwebtoken'
import users from '../routes/users.routes'

require('dotenv').config()

async function authToken(req, res, next) {

  const authHeader = await req.headers.authorization;
  const token = await authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(403).json({
      message: 'You have not the credentials, Login for it'
    }).redirect(users)
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(404).json({ message: 'An error has ocurred' })
    req.user = user
    console.log(user);
    next();
  })
}

export default authToken;