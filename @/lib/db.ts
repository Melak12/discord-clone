import { PrismaClient } from "@prisma/client";

// This code helps to create Prisma client and prevent to create a new Prisma client everytime in hot-reload 

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !=="production") globalThis.prisma = db;