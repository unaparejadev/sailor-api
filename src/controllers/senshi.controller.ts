import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllSenshis: RequestHandler = async (req, res) => {
  const senshis = await prisma.senshi.findMany({
    include: {
      familiars: true,
      colors: true,
      accessories: true,
    },
  });

  res.json(senshis);
};

export const GetSenshiById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: `Invalid ID: ${id}` });
  }

  const senshi = await prisma.senshi.findUnique({
    where: { id: Number(id) },
    include: {
      familiars: true,
      colors: true,
      accessories: true,
    },
  });

  if (senshi) {
    return res.json(senshi);
  }

  return res.status(404).json({ error: `Senshi with ID ${id} does not exist` });
};

export const CreateSenshi: RequestHandler = async (req, res) => {
  const { senshi, familiars, colors, accessories } = req.body;

  try {
    const newSenshi = await prisma.senshi.create({
      data: {
        ...senshi,
        familiars: {
          create: familiars,
        },
        colors: {
          create: colors,
        },
        accessories: {
          create: accessories,
        },
      },
    });
    return res.json(newSenshi);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const UpdateSenshi: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: `Invalid ID: ${id}` });
  }

  try {
    const updatedSenshi = await prisma.senshi.update({
      where: { id: Number(id) },
      data: req.body,
    });

    return res.json(updatedSenshi);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.json(post);
// });

// app.get("/senshis", async (req, res) => {
//   const senshis = await prisma.senshi.findMany({
//     include: {
//       familiars: true,
//       colors: true,
//       accessories: true,
//     },
//   });
//   res.json(senshis);
// });

// app.get("/user/:id/drafts", async (req, res) => {
//   const { id } = req.params;

//   const drafts = await prisma.user
//     .findUnique({
//       where: {
//         id: Number(id),
//       },
//     })
//     .posts({
//       where: { published: false },
//     });

//   res.json(drafts);
// });

// app.get(`/post/:id`, async (req, res) => {
//   const { id }: { id?: string } = req.params;

//   const post = await prisma.post.findUnique({
//     where: { id: Number(id) },
//   });
//   res.json(post);
// });

// app.get("/feed", async (req, res) => {
//   const { searchString, skip, take, orderBy } = req.query;

//   const or: Prisma.PostWhereInput = searchString
//     ? {
//         OR: [
//           { title: { contains: searchString as string } },
//           { content: { contains: searchString as string } },
//         ],
//       }
//     : {};

//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//       ...or,
//     },
//     include: { author: true },
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     orderBy: {
//       updatedAt: orderBy as Prisma.SortOrder,
//     },
//   });

//   res.json(posts);
// });
