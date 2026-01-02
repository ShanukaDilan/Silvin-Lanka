import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    if (process.env.DATABASE_URL?.includes("dummy")) {
        console.log("Using Mock Prisma Client for Build. URL:", process.env.DATABASE_URL);
        return new Proxy({}, {
            get: (target, prop) => {
                console.log(`[MockPrisma] Accessed property: ${String(prop)} `);
                if (prop === '$connect' || prop === '$disconnect') return async () => { };
                return new Proxy({}, {
                    get: (t, p) => {
                        console.log(`[MockPrisma] Accessed model: ${String(prop)}.${String(p)} `);
                        return async () => ([]);
                    }
                });
            }
        }) as unknown as PrismaClient;
    }
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
