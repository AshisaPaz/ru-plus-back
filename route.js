import {Router} from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

const router = Router();

router.post("/user", async (req, res) => {
    const {email, name, password, phone, role} = req.body

    const user = await prisma.user.create({data: {email, name, password, phone, role}});

    return res.json(user)
});

export {router};