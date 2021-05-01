import Sequelize from 'sequelize';

const NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path: `.env.${NODE_ENV}`
})


export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)