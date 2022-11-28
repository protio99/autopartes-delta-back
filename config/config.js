require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev' , 
    port: process.env.PORT || 5000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    userMail: process.env.USER_MAIL,
    userMailPassword: process.env.USER_MAIL_PASSWORD,
    userBaseURL: process.env.USER_BASE_URL 
}


module.exports = config;