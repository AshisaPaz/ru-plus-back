const express = require('express');

const walletController = require('../controllers/walletController');
const router = express.Router();


router.get('/', walletController.getWallets);
router.get("/:id", walletController.getWalletById);
router.post("/create", walletController.createWallet);
router.put('/:id', walletController.updateWallet);
router.delete('/delete/:id', walletController.deleteWallet);
router.post('/subtract', walletController.subtractFromWalletBalance);

module.exports = router;
