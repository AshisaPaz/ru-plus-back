const express = require("express");

const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.get("/", transactionController.getTransactions);
router.get("/:id", transactionController.getTransactionsByWallet);
router.post("/createTr", transactionController.createTr);

module.exports = router;
