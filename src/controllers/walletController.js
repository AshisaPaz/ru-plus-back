const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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

async function getWallets(res) {
    try {
        const wallets = await prisma.wallet.findMany({
            include: {
                transaction: true,
            }
        });
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

async function updateWallet(req, res) {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { id: id } });
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

async function subtractFromWalletBalance(idUser, price, idWallet) {
    console.log("aaaaa:", idUser, price, idWallet);
    try {
      const wallet = await prisma.wallet.findFirst({
        where: {
          id: idWallet,
        },
      });
      const user = await prisma.user.findUnique({
        where: {
          id: wallet.idUser,
        },
      });
      const newBalance = wallet.balance - price;
      if (newBalance < 0) {
        throw new Error("Insufficient funds");
      }
      const updatedWallet = await prisma.wallet.update({
        where: {
          idUser: user.id,
        },
        data: {
          balance: newBalance,
        },
      });
      console.log("updated wallet: ", updatedWallet);
      return updatedWallet;
    } catch (error) {
      console.error(error);
      throw error;
    }
}

module.exports = {
    createWallet,
    getWallets,
    getWalletById,
    updateWallet,
    deleteWallet,
    subtractFromWalletBalance,
};