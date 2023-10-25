const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const meals = [
  {
    name: "REGIONAL",
    price: 3,
  },
  {
    name: "SOPA OU BOLO",
    price: 1,
  },
  {
    name: "ALMOÇO",
    price: 3,
  },
];

const users = [
  {
    name: "Laura",
    email: "laura@teste.com",
    password: "123456",
    phone: "82988046320",
    role: "student",
    wallet: {
      create: {
        balance: 0,
      },
    },
  },
  {
    name: "Luiza",
    email: "luiza@teste.com",
    password: "123456",
    phone: "82988888888",
    role: "student",
    wallet: {
      create: {
        balance: 64,
      },
    },
  },
  {
    name: "Gustavo",
    email: "gustavo@teste.com",
    password: "123456",
    phone: "82966666666",
    role: "student",
    wallet: {
      create: {
        balance: 25,
      },
    },
  },
];

async function main() {
  console.log("Seeding meals...");

  for (const mealData of meals) {
    await prisma.meal.create({
      data: mealData,
    });
  }

  console.log("Seeding meals completed.");

  console.log("Seeding users...");

  for (const userData of users) {
    await prisma.user.create({
      data: userData,
    });
  }

  console.log("Seeding users completed.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
