const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const walletController = require('../controllers/walletController');

async function createTransaction(req, res) {
    const {insertedValue, idWalletUser, idMeal } = req.body;
    const date = new Date("2023-10-16T14:30:00");
    // const insertedValue = date.toISOString(); 
    try {
        const newTransaction = await prisma.transaction.create({
            data: {
                insertedValue,
                idWalletUser,
                idMeal
            }
        });
        const newBalance = await walletController.subtractFromWalletBalance(idWalletUser, idMeal);
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