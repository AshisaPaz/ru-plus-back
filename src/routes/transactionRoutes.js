const express = require('express');

const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.get('/', transactionController.getTransactions);
router.post('/create', transactionController.createTransaction);
router.get('/:id', transactionController.getTransactionByID);

module.exports = router;