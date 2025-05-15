// FILE: src/lib/db.ts
import { PrismaClient } from '@prisma/client';


// Create a global PrismaClient instance to avoid multiple connections in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


// Add the findUserByEmail function
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}


export default prisma;


