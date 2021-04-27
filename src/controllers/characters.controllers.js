import Character from '../models/characters.models';

export const getListCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll({
      attributes: ['img', 'name']
    })
    if (characters) {
      res.json({ data: characters })
    } else {
      res.send('There are no characters in the list')
    }
  } catch (error) {
    console.log(error);
  }
}

export const getFullCharacters = async (req, res) => {
  try {
    let characters = await Character.findAll()
    if (characters) {
      res.json({ data: characters })
    } else {
      res.send('There are no characters in the list')
    }
  } catch (error) {
    console.log(error);
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
      fields: ['img', 'name', 'age', 'weight', 'history']
    });
    if (newCharacter) {
      res.json({
        message: `Character ${name} was created Successfully`
      });
      console.log({ data: newCharacter })
    } else {
      res.json({
        message: 'Something has gone wrong'
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const { img, name, age, weight, history } = req.body;
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
    console.log(error);
  }
}

export const deleteCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    let countDeletedCharacters = await Character.destroy({
      where: {
        id_character: id
      }
    })
    res.json({
      message: 'Item Deleted successfully',
      count: countDeletedCharacters
    });
  } catch (error) {
    console.log(error)
  }
}

export const searchCharacter = () => {

}
