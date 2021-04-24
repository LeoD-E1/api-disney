import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

const User = sequelize.define('users', {
    id_user: { type: DataTypes.INTEGER, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'users',
    timestamps: false
});


export default User;