const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function createMeal(req, res) {
    const { name, price } = req.body;

    try {
        const meal = await prisma.meal.create({
            data: {
                name,
                price,
            }
        });
        res.status(201).json(meal);
        return meal;        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMeals(req, res) {
    try {
        const meals = await prisma.meal.findMany();
        res.status(200).json(meals);
        return meals;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createMeal,
    getMeals
};