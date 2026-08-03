import "dotenv/config"; // Ensures env vars are available during direct execution
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
// Make sure to import your configured client from your library file

async function main() {
  const hashed = await bcrypt.hash("admin@123", 10);

  await prisma.user.upsert({
    where: { email: "info@rehmahostels.com" },
    update: {
      userCode: "ADMIN002",
      name: "Admin",
      password: hashed,
      role: "ADMIN",
      phone: "+923000000000",
    },
    create: {
      userCode: "ADMIN002",
      name: "Admin",
      email: "info@rehmahostels.com",
      password: hashed,
      role: "ADMIN",
      phone: "+923000000000",
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
