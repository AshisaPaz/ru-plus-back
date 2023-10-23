const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const walletController = require('../controllers/walletController');

async function createTr(req, res) {
  const { price, mealType, idUser, idWallet, idMeal} = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: idUser,
    },
  });
  const wallet = await prisma.wallet.findUnique({
    where: {
      id: idWallet,
    },
  });

  const newBalance = wallet.balance - price;
  if (newBalance < 0) {
    return res.status(400).json({ error: "Not enough money" });
  }

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        Wallet: {
          connect: {
            idUser: idUser,
          },
        },
        Meal: {
          connect: {
            id: idMeal,
          },
        },
      },
    });    
    const transaction = await prisma.transaction.findFirst({
      where: {
        idWalletUser: user.id,
      },
    });
    const wallet = await prisma.wallet.findUnique({
      where: {
        idUser: user.id,
      },
    });
    const newBalance = await walletController.subtractFromWalletBalance(
      idUser,
      price,
      idWallet
    );
    res.status(201).json({ transaction: newTransaction, balance: newBalance });
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
    getTransactions,
    getTransactionByID,
    createTr,
};