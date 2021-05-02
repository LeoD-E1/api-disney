import express from 'express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
// Importing routes
import characters from './routes/characters.routes';
import movies from './routes/movies.routes';
import series from './routes/series.routes';
import users from './routes/users.routes';

const app = express()

async function authToken(req, res, next) {
  const authHeader = await req.headers.authorization;
  const token = await authHeader && authHeader.split(' ')[1];
  if (token == null) return res.json({
    message: 'You have not the credentials, Login for it'
  }).status(403);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(404)
    req.user = user
    next();
  })
}

app.set('PORT', process.env.PORT || 4000)

// midddlewares 
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/users', users);
app.use('/api/characters', authToken, characters);
app.use('/api/series', authToken, series);
app.use('/api/movies', authToken, movies);


export default app;
