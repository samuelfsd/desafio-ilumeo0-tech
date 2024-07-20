import { PrismaClient } from "@prisma/client";

import { users } from "./users";

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.$connect();
    await prisma.user.createMany({ data: users });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .then(() => console.log("Seed realizado com sucesso!"))
  .catch((e) => console.error("Erro ao realizar seed:", e));