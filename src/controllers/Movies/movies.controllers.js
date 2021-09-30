import Movie from '../../models/movies.models';
import Character from '../../models/characters.models';
import Character_Movie from '../../models/Character_Movie.models'

export const getMovies = async (req, res) => {
  try {
    let movies = await Movie.findAll({
      attributes: ['img', 'title', 'releasedate']
    })
    if (movies) {
      res.json({
        movies
      })
    } else {
      res.json({
        message: 'there are no movies in the list'
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export const getFullMovies = async (req, res) => {
  try {
    let movies = await Movie.findAll({ include: Character })
    if (movies) {
      res.json({
        movies
      })
    } else {
      res.json({
        message: 'there are no movies in the list'
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export const createMovie = async (req, res) => {
  try {
    const { img, title, rating, releasedate, gender } = req.body;
    let newMovie = await Movie.create({
      img,
      title,
      rating,
      releasedate,
      gender
    }, {
      fields: ['img', 'title', 'rating', 'releasedate', 'gender']
    })
    if (newMovie) {
      return res.json({
        message: `The movie ${title} has been created successfully`
      })
    } else {
      res.send('Something has gone wrong')
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const { img, title, rating, releasedate, gender } = req.body;
    let movie = await Movie.findAll({
      attributes: ['id_movie', 'img', 'title', 'rating', 'releasedate', 'gender'],
      where: {
        id_movie: id
      }
    })
    if (movie > 0) {
      movie.forEach(async item => {
        await item.update({ img, title, rating, releasedate, gender })
      });
    } else {
      res.json({
        message: 'id provided no exist'
      });
    }
    return res.json({
      message: `The movie ${title} has been updated successfully`,
      movie
    })
  } catch (error) {
    console.log(error);
  }
}

export const deleteMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    let countMoviesDeleted = await Movie.destroy({
      where: {
        id_movie: id
      }
    })
    if (countMoviesDeleted > 0) {
      res.json({
        message: 'The Movie has been deleted successfully',
        count: countMoviesDeleted
      })
    } else {
      res.json({
        message: 'id provided no exist'
      })
    }
  } catch (error) {
    console.log(error);
  }
}

export const searchMovie = async (req, res) => {
  const { title } = req.params;
  const movies = await Movie.findAll({
    where: {
      title
    },
    include: Character
  })
  if (movies) {
    res.json({
      movies
    })
  }
}