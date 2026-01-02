import "dotenv/config"; // Ensures env vars are available during direct execution
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
// Make sure to import your configured client from your library file

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "tahaasad709@gmail.com" },
    update: {},
    create: {
      userCode: "ADMIN001",
      name: "Developer",
      email: "tahaasad709@gmail.com",
      password: hashed,
      role: "ADMIN",
      phone: "+923259881310",
    },
  });

  console.log("Admin seeded successfully!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
