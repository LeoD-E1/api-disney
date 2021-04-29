import { sequelize } from '../database/database';
import { DataTypes } from 'sequelize';

import Serie from './series.models'
import Character from './characters.models';

const Character_Serie = sequelize.define('series_characters', {}, {
    timestamps: false,
    tableName: 'series_characters'
})

Character.belongsToMany(Serie, {
    through: Character_Serie,
    foreignKey: id_character,
    onDelete: 'CASCADE'
});

Serie.belongsToMany(Character, {
    through: Character_Serie,
    foreignKey: id_serie,
    onDelete: 'CASCADE'
});

export default Character_Serie;