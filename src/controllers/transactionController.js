const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const walletController = require("../controllers/walletController");
const userController = require("../controllers/userController");

async function createTr(req, res) {
  const { price, mealType, idUser, idWallet } = req.body;
  console.log("Received request to create transaction");

  if (!price || !mealType || !idUser || !idWallet) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const meal = await prisma.meal.findUnique({
    where: {
      name: mealType,
    },
  });

  if (!meal) {
    return res.status(400).json({ error: "Meal not found" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: idUser,
    },
  });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const wallet = await prisma.wallet.findUnique({
    where: {
      id: idWallet,
    },
  });

  console.log("Line 20:", user, wallet);

  if (wallet.balance < price) {
    return res.status(400).json({ error: "Not enough funds" });
  }

  try {
    console.log("Entered try-catch block.");

    const newTransaction = await prisma.transaction.create({
      data: {
        Wallet: {
          connect: {
            idUser: idUser,
          },
        },
        Meal: {
          connect: {
            name: mealType,
          },
        },
      },
    });

    console.log("newTransaction:", newTransaction);

    const transaction = await prisma.transaction.findFirst({
      where: {
        idWalletUser: user.id,
      },
    });

    console.log(transaction);

    const wallet = await prisma.wallet.findUnique({
      where: {
        idUser: user.id,
      },
    });

    console.log(wallet);

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
        idWalletUser: idWalletUser,
      },
    });
    res.status(200).json(transactions);
    return transactions;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTransactionsByUser(req, res) {
  const id = req.params.id;

  try {
    const user = await prisma.wallet.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        idWalletUser: id,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!transactions) {
      res.status(400).json({ error: "Transactions not found" });
    } else {
      res.status(200).json(transactions);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getTransactions,
  getTransactionsByUser,
  createTr,
};
