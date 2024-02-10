const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.NODE_SERVER_PORT;

const pool = require('./db');
const communityRouter = require('./routes/community');
const vacancyRequestRouter = require('./routes/vacancyRequest');

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', communityRouter);
app.use('/api', vacancyRequestRouter);

// Check database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to PostgreSQL database:', err);
        process.exit(1); // Exit process if unable to connect
    } else {
        console.log('Connected to PostgreSQL database:', res.rows[0]);
    }
});

// Starting the server
app.listen(port, () => {
    console.log('listening on port ');
})

