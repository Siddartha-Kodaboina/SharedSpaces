const pool = require('../db');
const DatabaseUtils = require('../utils/database-utils');
const userController = require('./userController');

// Static variables
tableName = 'community'
const dbUtils = new DatabaseUtils(tableName);

const createVacancyRequest = async (req, res) => {
    try {
        console.log("in the backend", req.body);
        const users = await userController.createUser(req.body.user);
        // const columns = await dbUtils.fetchAllColumns();
        // const validColumns = columns.filter(column => req.body.hasOwnProperty(column));

        // const values = validColumns.map((column) => req.body[column]);
        
        // const columnNamesString = validColumns.join(', ');
        // const valuePlaceholders = validColumns.map((_, index) => `$${index + 1}`).join(', ');
        // const insertQuery = `INSERT INTO community (${columnNamesString}) VALUES (${valuePlaceholders})`;

        // const result = await pool.query(insertQuery, values);
        // console.log("in the backend", req.body);
        console.log("in the users", users);
        res.status(201).json({
            message: 'Content added successfully',
            content: req.body,
        });
        
        
    } catch (error) {
        console.error('Error fetching community details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createVacancyRequest
};