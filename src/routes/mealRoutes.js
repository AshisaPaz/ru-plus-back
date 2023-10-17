const express = require('express');

const mealController = require('../controllers/mealController');
const router = express.Router();

router.post("/create", mealController.createMeal);

module.exports = router;