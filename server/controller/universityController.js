const pool = require('../db');
const DatabaseUtils = require('../utils/database-utils')

const getUniversity = async (data) => {
    let queryText = 'SELECT * from "university" WHERE place_id=$1';
    
    try {
        const res = await pool.query(queryText, [data.place_id]);
        console.log("res.rows ", res.rows);
        if(res.rows.length>0){
            return res.rows[0];
        }else{
            return null;
        }
    }
     catch (err) {
        throw new Error(`An error occurred while creating the user: ${err.message}`);
    }
};

const createUniversity = async (data) => {
    console.log(data);
    const university = await getUniversity(data);
    if(university!==null){
        return university;
    }
    console.log(university);
    
    return null;
    // const { uid, email, displayName, photoURL } = data;

    // let queryText = 'SELECT * from "customer" WHERE uuid=$1';
    // try {
    //     const res = await pool.query(queryText, [uid]);
    //     if(res.rows.length>0){
    //         return res.rows[0];
    //     }
    // }
    //  catch (err) {
    //     throw new Error(`An error occurred while creating the user: ${err.message}`);
    // }
    
    // queryText = 'INSERT INTO "customer"(uuid, email, display_name, dp_url) VALUES($1, $2, $3, $4) RETURNING *';

    // try {
    //     const res = await pool.query(queryText, [uid, email, displayName, photoURL]);
    //     return res.rows[0];
    // }
    //  catch (err) {
    //     throw new Error(`An error occurred while creating the user: ${err.message}`);
    // }
};

module.exports = {
    createUniversity
}