import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@gestaoobras.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@gestaoobras.com',
      passwordHash,
      role: UserRole.ADMIN,
    },
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
