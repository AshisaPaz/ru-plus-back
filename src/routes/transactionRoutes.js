const express = require("express");

const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.get("/", transactionController.getTransactions);
router.get("/:id", transactionController.getAllTransactionsByUser);
router.get("/latest/:id", transactionController.getLatestTransactionsByUser);
router.post("/createTr", transactionController.createTr);

module.exports = router;
