const pool = require('../db');
const DatabaseUtils = require('../utils/database-utils')

const getUser = async (uid) => {
    const queryText = 'SELECT * from "customer" WHERE uuid=$1';
    try {
        const result = await pool.query(queryText, [uid]);
        if(result.rows.length>0){
            return result.rows[0];
        }
    }
    catch (err) {
        throw new Error(`An error occurred while creating the user: ${err.message}`);
    }
};


const createUser = async (data) => {
    try {
        const { uid, email, displayName, photoURL } = data;
        const user = await getUser(uid);
        if(user!==null){
            return {
                user: user
            };
        }
        
        
        const queryText = 'INSERT INTO "customer"(uuid, email, display_name, dp_url) VALUES($1, $2, $3, $4) RETURNING *';
        const result = await pool.query(queryText, [uid, email, displayName, photoURL]);
        return {
            user: result.rows[0]
        };
    }
     catch (err) {
        throw new Error(`An error occurred while creating the user: ${err.message}`);
    }
};

module.exports = {
    createUser
}