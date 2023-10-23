const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createEx(req, res) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        idWalletUser: idWalletUser,
      },
    });
    res.status(200).json(transactions);
    return transactions;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
