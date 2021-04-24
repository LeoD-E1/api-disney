import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import Serie from './series.models';
import Character from './characters.models';

const SeriesCharacters = sequelize.define('series_characters', {
    id_serie: {
        type: DataTypes.INTEGER,
        references: {
            model: Serie,
            key: 'id_serie'
        }
    },
    id_character: {
        type: DataTypes.INTEGER,
        references: {
            model: Character,
            key: 'id_character'
        }
    }
}, {
    tableName: 'series_characters',
    timestamps: false
});

Serie.belongsToMany(Character, { through: SeriesCharacters });
Character.belongsToMany(Serie, { through: SeriesCharacters });

export default SeriesCharacters;