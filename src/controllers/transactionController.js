const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const walletController = require('../controllers/walletController');

async function createTransaction(req, res) {
    let {insertedValue, idWalletUser, idMeal } = req.body;
    const date = new Date("2023-10-16T14:30:00");
    insertedValue = date.toISOString(); 
    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          insertedValue,
          idWalletUser,
          idMeal
        }
      });
      const transaction = await prisma.transaction.findFirst({
        where: {
          idWalletUser: idWalletUser,
        },
      });
      const user = await prisma.user.findUnique({
        where: {
          id: transaction.idWalletUser,
        },
      });
      const wallet = await prisma.wallet.findUnique({
        where: {
          idUser: user.id,
        },
      });
      console.log("wallet: ", wallet.idUser);
      const newBalance = await walletController.subtractFromWalletBalance(user.id, idMeal);
      res.status(201).json({transaction: newTransaction, balance: newBalance});
      return newTransaction;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

async function getTransactions(res) {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { 
                idWalletUser: idWalletUser 
            }
        });
        res.status(200).json(transactions);
        return transactions;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTransactionByID(req, res) {
    const { id } = req.params;
    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id,
            },
        });
        if (!transaction) {
            res.status(400).json({ error: "Transaction not found" });
        } else {
            res.status(200).json(transaction);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionByID,
};
