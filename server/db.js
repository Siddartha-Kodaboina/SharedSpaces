const Pool = require('pg').Pool;
const fs = require('fs');

const pool = new Pool({
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASS,
    host: process.env.POSTGRES_DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    database: process.env.POSTGRES_DB_NAME,
    ssl : {
        rejectUnauthorized: true, 
        ca: fs.readFileSync(process.env.POSTGRES_DB_SSL_CERT_PATH).toString()
    }
});

module.exports = pool;