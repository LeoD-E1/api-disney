import Serie from '../models/series.models'

export const getSeries = async (req, res) => {
  try {
    const series = await Serie.findAll({
      attributes: ['img', 'title', 'releasedate']
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
  const series = await Serie.findAll();
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
    const { img, title, rating, releasedate, gender } = req.body
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
    const found = await Serie.findAll({
      where: { id_serie: id }
    })
    let countDeletedSeries = await Serie.destroy({
      where: {
        id_serie: id
      }
    })
    res.json({
      message: 'Item has been deleted Successfully',
      countDeletedSeries
    })
  } catch (error) {
    console.log(error);
  }
}

export const searchSerie = async (req, res) => {

}




