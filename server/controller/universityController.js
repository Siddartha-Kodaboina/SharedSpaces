const pool = require('../db');
const DatabaseUtils = require('../utils/database-utils');
const universitySchema = require('../schema/university');

const getUniversity = async (data) => {
    let queryText = 'SELECT * from "university" WHERE place_id=$1';
    console.log(data.place_id );
    try {
        const res = await pool.query(queryText, [data.place_id]);
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
    // console.log(data);
    try {
        const university = await getUniversity(data.universityDetails);
        if(university!==null){
            console.log("Was There" );
            return {
                university: university
            };
        }
        console.log("Was Not There" );
        let tableColumnNames = [];
        let values = [];
        for (const key in data.universityDetails){
            let value = data.universityDetails[key];
            if (value==0 || value=="" || value==[]) continue;
            tableColumnNames.push(universitySchema[key]);
            if(key=="photo_urls"){
                photo_url_string = value.map((arr)=> arr.join(", ")).join(";");
                // console.log("Photo URL: " + photo_url_string);
                values.push(photo_url_string);
            }else{
                values.push(value);
            }
        }

        const nus=[], nus_distance=[];
        // console.log("data.nearesrestUniversityDetails", data.nearesrestUniversityDetails);
        for (const nearestUniversity of data.nearesrestUniversityDetails){
            // console.log("nearestUniversity", nearestUniversity );
            const uni_name = nearestUniversity.universityName;
            const uni_distance = nearestUniversity.distance;
            if (uni_name==0 || uni_name=="" || uni_name==[] || uni_distance==0 || uni_distance=="" || uni_distance==[]) continue;
            nus.push(uni_name);
            nus_distance.push(uni_distance);
        }
        // console.log("nus, nus_distance : ", nus, nus_distance);
        if(nus.length !==0){
            tableColumnNames.push(universitySchema['nearest_universities']);
            nearest_universities_string = nus.join(",");
            // console.log("nearest_universities_string: " + nearest_universities_string);
            values.push(nearest_universities_string);
            tableColumnNames.push(universitySchema['distances']);
            nearest_universities_distances_string = nus_distance.join(",");
            // console.log("nearest_universities_distances_string: " + nearest_universities_distances_string);
            values.push(nearest_universities_distances_string);
        }

        // console.log(" tableColumnNames : " + tableColumnNames);

        const tableColumnPlaceHolders = tableColumnNames.map((_, index) => `$${index + 1}`).join(', ');

        const insertQuery = `INSERT INTO university (${tableColumnNames}) VALUES (${tableColumnPlaceHolders}) RETURNING *`;

        const result = await pool.query(insertQuery, values);
        return {
            university: result.rows[0]
        };
        // return "No insert statement";
    } catch (error) {
        console.error('Error inserting university details:', error);
        throw new Error("Failed to insert university details");
    }
    
};

module.exports = {
    createUniversity
}