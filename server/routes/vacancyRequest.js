const express = require('express');
const router = express.Router();
const vacancyRequestController = require('../controller/vacancyRequestController');

// Routes

// post: create a new vacancy request
router.post('/vacancy-request', vacancyRequestController.createVacancyRequest);

module.exports = router;
