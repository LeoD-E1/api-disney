import Movie from '../models/movies.models';

export const getMovies = () => {

}

export const getFullMovies = () => {

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
        message: 'The movie has been created successfully'
      })
    } else {
      res.send('Something has gone wrong')
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateMovieById = () => {

}

export const deleteMovieById = () => {

}

