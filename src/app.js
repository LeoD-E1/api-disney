import express from 'express';
import morgan from 'morgan';
// Importing routes
import characters from './routes/characters.routes';
import movies from './routes/movies.routes';
import series from './routes/series.routes';
import users from './routes/users.routes';
import authToken from './helpers/decodeToken';

const app = express()

app.set('PORT', process.env.PORT || 4000)

// midddlewares 
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/users', users);
app.use('/api/characters', /* authToken, */ characters);
app.use('/api/series', /* authToken, */ series);
app.use('/api/movies',/*  authToken, */ movies);

export default app;
