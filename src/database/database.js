import Sequelize from 'sequelize';
require('dotenv').config()

export const sequelize = new Sequelize(
    'postgres',
    '12345',
    'apidisney',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)