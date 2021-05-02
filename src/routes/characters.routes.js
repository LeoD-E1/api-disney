import { Router } from 'express';

import {
  getListCharacters,
  getFullCharacters,
  createCharacter,
  updateCharacterById,
  deleteCharacterById,
  searchCharacter
} from '../controllers/characters.controllers';


const router = Router();



// List of characters where only img and the name of the respective character are shown
router.get('/', getListCharacters)
// Get List sof Characters with full details
router.get('/characters', getFullCharacters)
// Create a character
router.post('/create', createCharacter)
// update a character by id
router.put('/update/:id', updateCharacterById)
//Delete a Character by id
router.delete('/delete/:id', deleteCharacterById)
// Endpoint to search by name and filter by weight, age or Movie/Serie 
router.get('/find/:name', searchCharacter)

export default router;