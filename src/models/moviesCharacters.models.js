import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import Movie from '../models/movies.models';
import Character from '../models/characters.models';

const MoviesCharacters = sequelize.define('movies_characters', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: DataTypes.STRING,
    title: DataTypes.STRING
}, {
    tableName: 'movies_characters',
    timestamps: false
})

Movie.belongsToMany(Character, { through: MoviesCharacters });
Character.belongsToMany(Movie, { through: MoviesCharacters });

export default MoviesCharacters;