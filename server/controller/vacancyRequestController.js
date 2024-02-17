const pool = require('../db');
const DatabaseUtils = require('../utils/database-utils');
const userController = require('./userController');
const universityController = require('./universityController');
const communityController = require('./communityController');

// Static variables
tableName = 'community'
const dbUtils = new DatabaseUtils(tableName);

const createVacancyRequest = async (req, res) => {
    try {
        console.log("in the backend", req.body);
        
        // return res.status(201).json({
        //     message: 'Content added successfully',
        //     content: "Testing returning empty response"
        // });
        const user = await userController.createUser(req.body.user);
        // console.log(user);

        const university = await universityController.createUniversity(
            {
                universityDetails: req.body.universityDetails, 
                nearesrestUniversityDetails:req.body.nearesrestUniversityDetails
            }
        );
        // console.log(university);

        const community = await communityController.createCommunity(req.body.communityDetails);
        // console.log(community);
        
        
        res.status(201).json({
            message: 'Content added successfully',
            content: {
                ...user,
                ...university
            }
        });
        
        
    } catch (error) {
        console.error('Error fetching community details:', error);
        res.status(500).json({ error: 'Internal server error : ' + error.message });
    }
};

module.exports = {
    createVacancyRequest
};