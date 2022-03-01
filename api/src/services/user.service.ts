import { PrismaClient, Prisma } from "@prisma/client";
import argon2 from "argon2";
const prisma = new PrismaClient();
const user = prisma.user;

const userSelect: Prisma.UserSelect = {
    id: true,
    email: true,
    firstname: true,
    lastname: true
}

export async function createUser(data: Prisma.UserUncheckedCreateInput): Promise<Prisma.UserSelect> {
    const { email, password, firstname, lastname } = data;
    const hashedPassword = await argon2.hash(password);
    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstname,
            lastname
        },
        select: userSelect
    });
}

export async function findUserByEmail(email: string) {
    return user.findUnique({ where: { email } });
}

export async function findUserById(id: number) {
    return user.findUnique({ where: { id } });
}

export async function validatePassword(userPassword: string, candidatePassword: string) {
    try {
        return await argon2.verify(userPassword, candidatePassword);
    } catch (e) {
        console.error(e, "Could not validate password");
        return false;
    }
}

export const PRIVATE_FIELDS = [
    "password"
];