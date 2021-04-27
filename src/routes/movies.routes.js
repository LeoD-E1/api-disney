import { Router } from 'express';
import { getMovies, getFullMovies, createMovie, updateMovieById, deleteMovieById, searchMovie } from '../controllers/movies.controllers'

const router = Router();

// Only show img, title and creation date
router.get('/', getMovies);
//It will return all the fields of the film together with the characters associated with it
router.get('/movies', getFullMovies);
// basic movie creation, editing, and deleting operations
router.post('/create', createMovie);
router.put('/update/:id', updateMovieById);
router.delete('/delete/:id', deleteMovieById);
// search movies by title and filter by gender and release date in order asc o desc
router.get('/search/:title', searchMovie);

export default router;