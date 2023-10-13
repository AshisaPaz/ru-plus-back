const express = require('express');

const transactionController = require('../controller/transactionController');
const router = express.Router();

router.get('/', transactionController.getTransactions);
router.get('/create', transactionController.createTransaction);
router.get('/:id', transactionController.getTransactionByID);

module.exports = router;