import Sequelize from 'sequelize';
require('dotenv').config()

new Sequelize(
    process.env.POSTGRESQL_USER,
    process.env.POSTGRESQL_PASSWORD,
    process.env.POSTGRESQL_DB,
    {
        host: POSTGRESQL_HOST,
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