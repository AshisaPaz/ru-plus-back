const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes');
const walletRoutes = require('./src/routes/walletRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const mealRoutes = require('./src/routes/mealRoutes');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/wallet', walletRoutes);
app.use('/transaction', transactionRoutes);
app.use('/meal', mealRoutes);

app.post("/transaction/create", (req, res) => {
    const { price, mealType } = req.body;

    console.log(price, mealType);
});

module.exports = app;