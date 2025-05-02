// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create tailor user
  const tailorPassword = await hash('tailor123', 10);
  const tailor = await prisma.user.upsert({
    where: { email: 'tailor@example.com' },
    update: {},
    create: {
      email: 'tailor@example.com',
      name: 'Sample Tailor',
      password: tailorPassword,
      role: 'TAILOR',
    },
  });

  console.log({ admin, tailor });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });