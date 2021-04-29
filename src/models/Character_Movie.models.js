import { sequelize } from '../database/database';
import { DataTypes } from 'sequelize';

import Movie from './movies.models';
import Character from './characters.models'

const Character_Movie = sequelize.define('movies_characters', {}, {
    timestamps: false,
    tableName: 'movies_characters'
})

Movie.belongsToMany(Character, {
    through: Character_Movie,
    foreignKey: 'id_movie',
    onDelete: 'CASCADE'
});
Character.belongsToMany(Movie, {
    through: Character_Movie,
    foreignKey: 'id_character',
    onDelete: 'CASCADE'
});

export default Character_Movie;

