import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const config = process.env.MONGODB_URI;

export const db = new PrismaClient({
  datasources: {
    db: {
      url: config,
    },
  },
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
