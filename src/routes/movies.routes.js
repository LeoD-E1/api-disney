import { Router } from 'express';
const router = Router();
import { getMovies, getFullMovies, createMovie, updateMovieById, deleteMovieById } from '../controllers/movies.controllers'

// Only show img, title and creation date
router.get('/', getMovies)
//It will return all the fields of the film together with the characters associated with it
router.get('/movies', getFullMovies)
// basic movie creation, editing, and deleting operations
router.post('/create', createMovie)
router.put('/update/:id', updateMovieById)
router.delete('/delete/:id', deleteMovieById)

export default router;