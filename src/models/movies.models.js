import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

const Movie = sequelize.define('movies', {
    id_movie: { type: DataTypes.INTEGER, primaryKey: true },
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
    tableName: 'movies',
    timestamps: false
});


export default Movie;
