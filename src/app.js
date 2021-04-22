import express from 'express';
import morgan from 'morgan';

// Importing routes
import characters from './routes/characters.routes';
import movies from './routes/movies.routes';
import series from './routes/series.routes';
import users from './routes/users.routes';

const app = express()

app.set('PORT', process.env.PORT || 4000)

// midddlewares 
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/users', users);
app.use('/api/characters', characters);
app.use('/api/series', series);
app.use('/api/movies', movies);


export default app;
