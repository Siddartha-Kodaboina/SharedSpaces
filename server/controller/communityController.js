const pool = require('../db');
const DatabaseUtils = require('../utils/database-utils');
const communitySchema = require('../schema/community');

// Static variables
tableName = 'community'
const dbUtils = new DatabaseUtils(tableName);

const getCommunity = async (communityDetails) => {
    let queryText = 'SELECT * from "community" WHERE place_id=$1';
    console.log(communityDetails.place_id );
    try {
        const res = await pool.query(queryText, [communityDetails.place_id]);
        if(res.rows.length>0){
            return res.rows[0];
        }else{
            return null;
        }
    }
     catch (err) {
        throw new Error(`An error occurred while creating the community: ${err.message}`);
    }
};

const createCommunity = async (communityDetails) => {
    try {
        const community = await getCommunity(communityDetails);
        if(community!==null){
            return {
                community: community
            };
        }

        let tableColumnNames = [];
        let values = [];
        for (const key in communityDetails){
            let value = communityDetails[key];
            console.log(key, value);
            if (value==0 || value=="" || value==[]) continue;
            tableColumnNames.push(communitySchema[key]);
            if(key=="photo_urls"){
                photo_url_string = value.map((arr)=> arr.join(", ")).join(";");
                values.push(photo_url_string);
            }else{
                values.push(value);
            }
        }

        const tableColumnPlaceHolders = tableColumnNames.map((_, index) => `$${index + 1}`).join(', ');

        const insertQuery = `INSERT INTO community (${tableColumnNames}) VALUES (${tableColumnPlaceHolders}) RETURNING *`;

        const result = await pool.query(insertQuery, values);
        return {
            community: result.rows[0]
        };
    } catch (err) {
        throw new Error(`An error occurred while creating the community: ${err.message}`);
    }
};
const createCommunity1 = async (req, res) => {
    try {

        const columns = await dbUtils.fetchAllColumns();
        const validColumns = columns.filter(column => req.body.hasOwnProperty(column));

        const values = validColumns.map((column) => req.body[column]);
        
        const columnNamesString = validColumns.join(', ');
        const valuePlaceholders = validColumns.map((_, index) => `$${index + 1}`).join(', ');
        const insertQuery = `INSERT INTO community (${columnNamesString}) VALUES (${valuePlaceholders})`;
        // const selectquery = `SELECT * FROM community`;

        console.log(req.body);
        console.log("validColumns", validColumns);
        console.log(columnNamesString);
        console.log(insertQuery);
        console.log(valuePlaceholders);
        console.log(values);

        const result = await pool.query(insertQuery, values);
        // const result = await pool.query(selectquery);
        // res.json(result.rows);
        // const result = await pool.query(
        //     `INSERT INTO community (pincode, pool, gym, cctv, rating, community_title, city, website_link, description, location_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        //     [values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9]]
        // );
        res.status(201).json({
            message: 'Content added successfully',
            content: result.rows[0],
        });
        
    } catch (error) {
        console.error('Error fetching community details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const readCommunityByID = async (req, res) => {
    try {
        const {id} = req.body;
        const query = `SELECT * FROM community WHERE community_id =$1`;

        const result = await pool.query(query, [id]);
        res.status(201).json({
            message: 'Content retrieved successfully',
            content: result.rows[0],
        });
    } catch (error) {
        console.error('Error fetching community details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const readCommunity = async (req, res) => {
    try {
        const query = `SELECT * FROM community`;

        const result = await pool.query(query);
        res.status(201).json({
            message: 'Content retrieved successfully',
            content: result.rows,
        });
    } catch (error) {
        console.error('Error fetching community details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateCommunity = async (req, res) => {
    try {
        const { id, content } = req.body;

        const columns = await dbUtils.fetchAllColumns();
        const validColumns = columns.filter(column => content.hasOwnProperty(column));

        let updateParts = [];
        let values = [id]; 
        let paramCounter = 2; 
        for (const column of validColumns) {
            const value = content[column];

            updateParts.push(`${column} = $${paramCounter}`);
            values.push(value);

            paramCounter++;
        }

        const updateString = updateParts.join(", ");
        const query = `UPDATE community SET ${updateString} WHERE community_id = $1`;

        const result = await pool.query(query, values);

        console.log(query);
        res.status(201).json({
            message: "Updated Successfully"
        });
    } catch (error) {
        console.error('Error updating community details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createCommunity,
    createCommunity1,
    readCommunityByID,
    readCommunity,
    updateCommunity
};