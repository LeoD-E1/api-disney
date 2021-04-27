import { Router } from 'express';
import { getSeries, getFullSeries, createSerie, updateSerieById, deleteSerieById, searchSerie } from '../controllers/series.controllers'

const router = Router();

// Only show img, title and creation date
router.get('/', getSeries);
//It will return all the fields of the film together with the characters associated with it
router.get('/series', getFullSeries);
// basic movie creation, editing, and deleting operations
router.post('/create', createSerie);
router.put('/update/:id', updateSerieById);
router.delete('/delete/:id', deleteSerieById);
// search movies by title and filter by gender and release date in order asc o desc
router.get('/search/:title', searchSerie);

export default router;