import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const isTest = process.env.NODE_ENV === 'test'

const sequelize = new Sequelize('test-db', process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: 'sqlite',
  host: process.env.DATABASE_NAME,
  logging: isTest ? false : console.log
})

export default sequelize
