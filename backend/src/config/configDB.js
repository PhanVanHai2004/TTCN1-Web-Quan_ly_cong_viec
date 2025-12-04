import dotenv from 'dotenv'
import pg from 'pg'
dotenv.config()
pg.types.setTypeParser(1082, value => value)
export const DBconfig = {connectionString: 
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`}
