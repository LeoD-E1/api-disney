import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

const Serie = sequelize.define('series', {
    id_serie: { type: DataTypes.INTEGER, primaryKey: true },
    img: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
    },
    releasedate: { type: DataTypes.DATEONLY, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'series',
    timestamps: false
});

export default Serie;