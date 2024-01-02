const express = require('express');
const router = express.Router();
const communityController = require('../controller/communityController');

// Routes

// post: create a new community
router.post('/community', communityController.createCommunity);

// get: read a community By ID
router.get('/community/:id', communityController.readCommunityByID);

// get: readAll
router.get('/community', communityController.readCommunity);

// put: update a community by ID
router.put('/community/:id', communityController.updateCommunity);

module.exports = router;
