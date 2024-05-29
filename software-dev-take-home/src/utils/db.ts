import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function setupDb() {
  await prisma.$connect();
  console.log("Connected to the database");
}

export async function addFormData(name: string, email: string, stockSymbol: string) {
  const formData = await prisma.formData.create({
    data: {
      name,
      email,
      stockSymbol,
    },
  });
  return formData;
}

export async function getFormData(id: number) {
  const formData = await prisma.formData.findUnique({
    where: {
      id,
    },
  });
  return formData;
}

export async function getAllFormData() {
  const formData = await prisma.formData.findMany();
  return formData;
}
