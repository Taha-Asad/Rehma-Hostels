// // import "dotenv/config"; // Ensures env vars are available during direct execution
// // import bcrypt from "bcryptjs";
// // // Make sure to import your configured client from your library file
// // import { prisma } from "../src/lib/prisma";

// // async function main() {
// //   const hashed = await bcrypt.hash("admin123", 10);

// //   await prisma.user.upsert({
// //     where: { email: "tahaasad709@gmail.com" },
// //     update: {},
// //     create: {
// //       name: "Developer",
// //       email: "tahaasad709@gmail.com",
// //       password: hashed,
// //       role: "ADMIN",
// //       phone: "+923259881310",
// //     },
// //   });

// //   console.log("Admin seeded successfully!");
// // }

// // main()
// //   .catch((err) => {
// //     console.error(err);
// //     process.exit(1);
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });

// import "dotenv/config";
// import bcrypt from "bcryptjs";
// import { prisma } from "../src/lib/prisma";
// import { faker } from "@faker-js/faker";
// import type { Prisma } from "@prisma/client";

// async function main() {
//   const usersToCreate = 20;

//   const userData: Prisma.UserCreateManyInput[] = Array.from({
//     length: usersToCreate,
//   }).map(() => ({
//     userCode: faker.string.alphanumeric(8),

//     name: faker.person.fullName(),
//     email: faker.internet.email().toLowerCase(),
//     password: bcrypt.hashSync("user123", 10),
//     role: "USER",
//     phone: faker.phone.number({ style: "international" }),
//   }));

//   await prisma.user.createMany({
//     data: userData,
//     skipDuplicates: true,
//   });

//   console.log(`${usersToCreate} random users seeded successfully!`);
// }

// main()
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
