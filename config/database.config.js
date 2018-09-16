require('dotenv').config();

module.exports = {
    development: {
        url: process.env.DB_URL
    },
    test: {
        url: process.env.TEST_DATABASE_URL
    },
}