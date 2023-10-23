const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createUser(req, res) {
    const {name, email, password, phone, role} = req.body
    console.log(name, email, password, phone, role);

    try {
        if(!email || !name || !password || !phone){
            return res.status(400).json({error: "All fields are required"})
        }
        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        else{
            const user = await prisma.user.create({
                data: {
                    name, 
                    email, 
                    password, 
                    phone, 
                    role,
                    wallet: {
                        create: {
                            balance: 0,
                        },
                    },
                },
                include: {
                    wallet: true,
                },
            });
            return res.status(200).json({message: "User created"});
            
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err})
    }
}

async function getUser(req, res) {
    const users = await prisma.user.findMany({
        include: {
            wallet: true,
        },
    });

    return res.json(users);
}


async function getUserById(req, res) {
    const {id} = req.body;
    console.log(id, req.body);
    try {
        const user = await prisma.user.findUnique({
            where: {id},
            include: {
                wallet: true,
            },
        });
        

        if(!user){
            return res.status(404).json({message: 'user not found'});
        }

        return res.status(200).json(user); 
    } catch (err) {
        return res.status(500).json({error: err})
    }
}


async function updateUser(req, res) {
    const {id} = req.params;
    const {email, name, password, phone, role} = req.body;

    try {
        const user = await prisma.user.update({
            where: {id},
            data: {email, name, password, phone, role}
        });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({error: err})
    }
}

async function deleteUser(req, res) {
    const {id} = req.params;
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        const wallet = await prisma.wallet.findUnique({ where: { idUser: user.id } });
        if (wallet) {
            await prisma.wallet.delete({ where: { id: wallet.id } });
        }
        const deletedUser = await prisma.user.delete({
            where: { id: user.id }
        });
        return res.status(200).json(deletedUser);
    } catch (err) {
        return res.status(500).json({error: err})
    }
}

async function loginUser(req, res) {
    const {email, password} = req.body
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
                password: password,
            },
            include: {
                wallet: true,
            },
        });
        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        
        if (user.password !== password) {
            return res.status(401).json({error: "Incorrect password"})
        }

        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({error: err})
    }
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
}
