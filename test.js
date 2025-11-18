import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDB() {
  try {
    await prisma.$connect();
    console.log("Database connected ✅");
  } catch (err) {
    console.error("DB connection failed ❌", err);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();
