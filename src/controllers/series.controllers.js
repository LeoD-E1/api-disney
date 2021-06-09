import Serie from '../models/series.models'
import Character from '../models/characters.models';
import Character_Serie from '../models/Character_Serie.models';

export const getSeries = async (req, res) => {
  try {
    const series = await Serie.findAll({
      attributes: ['img', 'title', 'releasedate'],
      include: Character
    });
    if (serie) {
      res.json({
        series
      })
    } else {
      res.json({ message: 'No series avaible in the list' }).status(404);
    }
  } catch (error) {
    console.log(error)
  }
}

export const getFullSeries = async (req, res) => {
  const series = await Serie.findAll({ include: Character });
  if (series) {
    res.json({
      series
    })
  } else {
    res.json({ message: 'No series avaible in the list' }).status(404);
  }
}

export const createSerie = async (req, res) => {
  try {
    const { img, title, rating, releasedate, gender } = req.body;
    const newSerie = await Serie.create({
      img,
      title,
      rating,
      releasedate,
      gender
    }, {
      fields: ['img', 'title', 'rating', 'releasedate', 'gender']
    })

    if (newSerie) {
      res.json({
        message: `${title} was saved successfully`
      })
    } else {
      res.json({ message: 'Some has gone wrong' });
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateSerieById = async (req, res) => {
  try {
    const { id } = req.params;
    const { img, title, rating, releasedate, gender } = req.body;

    let series = await Serie.findAll({
      attributes: ['id_serie', 'img', 'title', 'rating', 'releasedate', 'gender'],
      where: {
        id_serie: id
      }
    });
    if (series.length > 0) {
      series.forEach(async serie => {
        await serie.update({ img, title, rating, releasedate, gender });
      });
    } else {
      res.json({
        message: 'ID provided not exist'
      })
    }
    return res.json({
      message: 'Item has been updated successfully',
      series
    })
  } catch (error) {
    console.log(error);
  }
}

export const deleteSerieById = async (req, res) => {
  try {
    const { id } = req.params;
    let countDeletedSeries = await Serie.destroy({
      where: { id_serie: id },
      include: Character
    })
    await res.json({
      message: `Serie ${id} has been deleted Successfully`,
      countDeletedSeries
    })
  } catch (error) {
    console.log(error);
  }
}

export const searchSerie = async (req, res) => {
  try {
    const { title } = req.params;
    const series = await Serie.findAll({
      where: {
        title
      },
      include: Character
    })
    res.json({
      series
    })
  } catch (error) {
    console.log(error);
  }
}




