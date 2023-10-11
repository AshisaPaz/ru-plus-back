const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes');
const walletRoutes = require('./src/routes/walletRoutes');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/wallet', walletRoutes);
module.exports = app;