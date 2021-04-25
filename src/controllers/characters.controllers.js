import Character from '../models/characters.models';

export const getListCharacters = () => {

}
export const getFullCharacters = () => {

}
export const createCharacter = async (req, res) => {
  try {
    const { img, name, age, weight, history } = req.body;
    const newCharacter = await Character.create({
      img,
      name,
      age,
      weight,
      history
    }, {
      fields: ['img', 'name', 'age', 'weight', 'history']
    });
    if (newCharacter) {
      res.send('Character was created Successfully');
      console.log({ data: newCharacter })
    } else {
      res.send('Something goes wrong')
    }
  } catch (error) {
    console.log(error);
  }

}
export const updateCharacterById = () => {

}
export const deleteCharacterById = () => {

}

export const searchCharacter = () => {

}
