const pool = require('../db');
const DatabaseUtils = require('../utils/database-utils')

const createUser = async (data) => {
    const { uid, email, displayName, photoURL } = data;

    let queryText = 'SELECT * from "customer" WHERE uuid=$1';
    try {
        const res = await pool.query(queryText, [uid]);
        if(res.rows.length>0){
            return res.rows[0];
        }
    }
     catch (err) {
        throw new Error(`An error occurred while creating the user: ${err.message}`);
    }
    
    queryText = 'INSERT INTO "customer"(uuid, email, display_name, dp_url) VALUES($1, $2, $3, $4) RETURNING *';

    try {
        const res = await pool.query(queryText, [uid, email, displayName, photoURL]);
        return res.rows[0];
    }
     catch (err) {
        throw new Error(`An error occurred while creating the user: ${err.message}`);
    }
};

module.exports = {
    createUser
}