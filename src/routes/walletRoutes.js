const express = require('express');

const walletController = require('../controller/walletController');
const router = express.Router();


router.get('/', walletController.getWallets);
router.get("/:id", walletController.getWalletById);
router.post("/create", walletController.createWallet);
router.put('/:id', walletController.updateWallet);
router.delete('/delete/:id', walletController.deleteWallet);

module.exports = router;
