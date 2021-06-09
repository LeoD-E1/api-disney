import Serie from '../models/series.models'
import Character from '../models/characters.models';
import Character_Serie from '../models/Character_Serie.models';

export const queryDeleteSerie = async (id, res) => {

  const serie = await Serie.findAll({
    where: { id_serie: id },
    include: Character
  })

  if (serie.length > 0) {
    try {
      await Serie.destroy({
        where: { id_serie: id },
        include: Character
      })
    } catch (error) {
      return res.json({ error })
    }
    return res.json({
      message: 'Serie deleted successfully',
      serie: `${serie[0].title}`
    })
  } else {
    return res.json({
      message: 'Serie not found or no exist'
    })
  }

}

