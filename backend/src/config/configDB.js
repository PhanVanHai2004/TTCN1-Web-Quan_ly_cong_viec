import dotenv from 'dotenv'
dotenv.config()
export const DBconfig = {connectionString: 
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`}
