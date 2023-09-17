import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const senshiData: Prisma.SenshiCreateInput[] = [
  {
    codeName: "Sailor Moon",
    planet: "Moon",
    firstName: "Usagi",
    lastName: "Tuskino",
    age: 14,
    familiars: {
      create: [{ name: "Luna" }],
    },
    colors: {
      create: [
        { name: "Blue", code: "#5158ff" },
        { name: "Pink", code: "#ff2e51" },
      ],
    },
    accessories: {
      create: [
        { name: "Moon Prism" },
        { name: "Moon Stick" },
        { name: "Moon Transformation Pen" },
      ],
    },
  },
  {
    codeName: "Sailor Mars",
    planet: "Mars",
    firstName: "Rei",
    lastName: "Hino",
    age: 14,
    familiars: {
      create: [{ name: "Phobos" }, { name: "Deimos" }],
    },
    colors: {
      create: [
        { name: "Red", code: "#921a1a" },
        { name: "Violet", code: "#5a2c74" },
      ],
    },
    accessories: {
      create: [{ name: "Mars Transformation Pen" }],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const senshi of senshiData) {
    const newSenshi = await prisma.senshi.create({
      data: senshi,
    });
    console.log(`Created sailor senshi with id: ${newSenshi.id}`);
  }
  console.log(`Seeding finished.`);
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
