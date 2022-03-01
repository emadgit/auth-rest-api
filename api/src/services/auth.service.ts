import { PrismaClient, Prisma, Session } from "@prisma/client";

const prisma = new PrismaClient();

const ownerSelect: Prisma.SessionSelect = {
    id: true,
    ownerId: true
}

export async function createSession(data: Prisma.SessionUncheckedCreateInput): Promise<Prisma.SessionSelect> {
    const { ownerId } = data;
    return prisma.session.create({
        data: {
            ownerId
        },
        select: ownerSelect
    });
}

export async function findSessionById(id: number): Promise<Session | null> {
    return prisma.session.findFirst({ where: { id } });
}

export async function logoutSession(sessionId: number) { 
    return prisma.session.update({ where: { id: sessionId }, data: { valid: false }});
}