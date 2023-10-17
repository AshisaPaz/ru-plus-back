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

module.exports = {
    createMeal,
};