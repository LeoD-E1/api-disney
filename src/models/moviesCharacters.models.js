import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import Movie from '../models/movies.models';
import Character from '../models/characters.models';

const MoviesCharacters = sequelize.define('movies_characters', {
    id_movie: DataTypes.INTEGER,
    references: {
        model: Movie,
        key: 'id_movie'
    },
    id_character: DataTypes.INTEGER,
    references: {
        model: Character,
        key: 'id_character'
    }
}, {
    tableName: 'movies_characters',
    timestamps: false
})

Movie.belongsToMany(Character, { through: MoviesCharacters });
Character.belongsToMany(Movie, { through: MoviesCharacters });

export default MoviesCharacters;