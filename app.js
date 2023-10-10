const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/user', userRoutes);

module.exports = app;