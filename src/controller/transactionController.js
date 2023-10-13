const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function createTransaction(req, res){
    const { id, insertedValue, idWalletUser, idMeal } = req.body;
    try {
        if(!idWalletUser){
            return res.status(400).json({ error: "Invalid wallet ID "});
        }
        const existingWallet = await prisma.wallet.findUnique({ where: {id: idWalletUser }});
        if(!existingWallet) {
            return res.status(400).json({error: "Wallet not found"});
        }
        const transaction = await prisma.transaction.create({
            data: {
                insertedValue,
                idWalletUser,
            },
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function getTransactions(res){
    try {
        const transactions = await prisma.transaction.findMany();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTransactionByID(req, res){
    const { id } = req.params;
    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            },
        });
        if(!transaction) {
            res.status(400).json({ error: "transaction not found" });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    createTransaction,
    getTransactions,
    getTransactionByID
}