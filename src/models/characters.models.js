import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

const Character = sequelize.define('characters', {
  id_character: { type: DataTypes.INTEGER, primaryKey: true },
  img: { type: DataTypes.TEXT, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  weight: { type: DataTypes.FLOAT, allowNull: false },
  history: { type: DataTypes.TEXT, allowNull: false }
}, {
  tableName: 'characters',
  timestamps: false
});

export default Character;