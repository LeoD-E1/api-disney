import Character from '../../models/characters.models';
import Movie from '../../models/movies.models';
import Serie from '../../models/series.models';

export const getListCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll({
      attributes: ['img', 'name']
    })
    if (!characters) {
      res.send('There are no characters in the list')
    }
    res.json({ characters }).status(200)
  } catch (error) {
    res.json({ error })
  }
}

export const getFullCharacters = async (req, res) => {
  try {
    let characters = await Character.findAll({ include: [Movie, Serie] })
    if (!characters) {
      res.json({ message: 'There are no characters on list' })
    }
    res.json({ data: characters })
  } catch (error) {
    res.json({ error })
  }
}

export const createCharacter = async (req, res) => {
  try {
    const { img, name, age, weight, history } = req.body;
    let newCharacter = await Character.create({
      img,
      name,
      age,
      weight,
      history
    }, {
      fields: ['img', 'name', 'age', 'weight', 'history'],
    })

    if (!newCharacter) {
      res.json({
        message: 'Something has gone wrong'
      });
    }
    res.json({
      message: `Character ${name} was created Successfully`
    });

  } catch (error) {
    res.json({ error })
  }
}

export const updateCharacterById = async (req, res) => {
  const { id } = req.params;
  const { img, name, age, weight, history } = req.body;
  try {
    let characters = await Character.findAll({
      attributes: ['id_character', 'img', 'name', 'age', 'weight', 'history'],
      where: {
        id_character: id
      }
    })
    if (characters.length > 0) {
      characters.forEach(async character => {
        await character.update({
          img,
          name,
          age,
          weight,
          history
        })
      });
    } else {
      res.json({
        message: 'ID provided not exist'
      })
    }

    return res.json({
      message: 'Character updated Successfully',
      data: characters
    });
  } catch (error) {
    res.json({ error })
  }
}

export const deleteCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    let countDeletedCharacters = await Character.destroy({
      where: {
        id_character: id
      },
      include: Movie
    })
    res.json({
      message: 'Item Deleted successfully',
      count: countDeletedCharacters
    });
  } catch (error) {
    res.json({ error })
  }
}

export const searchCharacter = async (req, res) => {
  const { name } = req.params;

  const character = await Character.findAll({
    where: { name },
    include: [Movie, Serie]
  })
  if (character == 0) {
    res.json({
      message: 'Have not Characters with theses attributes'
    })
  }
  res.json({
    character
  })
}
