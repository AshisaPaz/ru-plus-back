const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// CREATE
async function createWallet(req, res) {
    const { id, balance, idUser } = req.body;
    try {
        if (!idUser) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const existingUser = await prisma.user.findUnique({ where: { id: idUser } });
        if (!existingUser) {
            return res.status(400).json({ error: "User not found" });
        }
        const wallet = await prisma.wallet.create({
            data: {
                balance,
                idUser,
            },
        });
        res.status(201).json(wallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// READ
async function getWallets(req, res) {
    try {
        const wallets = await prisma.wallet.findMany();
        res.status(200).json(wallets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getWalletById(req, res) {
    const { id } = req.params;
    try {
        const wallet = await prisma.wallet.findUnique({
            where: {
                id,
            },
        });
        if (!wallet) throw new Error('Wallet not found');
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// UPDATE
async function updateWallet(req, res) {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        const prev = await prisma.wallet.findUnique({ where: { idUser: id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if(!id){
            return res.status(404).json({ error: "Wallet not found" });
        }
        const updatedWallet = await prisma.wallet.update({
            where: { idUser: id },
            data: {
                balance: prev.balance + parseFloat(amount),
            },
        });
        res.status(200).json(updatedWallet);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

// DELETE
async function deleteWallet(req, res) {
    const { id } = req.params;
    try {
        const wallet = await prisma.wallet.delete({
            where: {
                id,
            },
        });
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createWallet,
    getWallets,
    getWalletById,
    updateWallet,
    deleteWallet,
};
