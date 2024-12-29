import { Sequelize, Dialect } from 'sequelize'
import 'dotenv/config'

const dbName = process.env.DB_NAME as string;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;

const sequelize = new Sequelize(
    dbName,
    dbUsername,
    dbPassword, {
    host: dbHost,
    dialect: 'mysql' 
})

export default sequelize