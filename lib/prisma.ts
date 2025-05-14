import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Create a global variable to hold the Prisma Client instance
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Create a global object to store the Prisma Client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Export the Prisma Client instance, creating it if it doesn't exist
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// If we're not in production, set the globalForPrisma.prisma value
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}