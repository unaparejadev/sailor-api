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

export const DeleteSenshi: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: `Invalid ID: ${id}` });
  }

  try {
    const deletedFamiliars = await prisma.familiar.deleteMany({
      where: { senshiId: Number(id) },
    });

    const deletedColors = await prisma.color.deleteMany({
      where: { senshiId: Number(id) },
    });

    const deletedAccessories = await prisma.accessory.deleteMany({
      where: { senshiId: Number(id) },
    });

    const deletedSenshi = await prisma.senshi.delete({
      where: { id: Number(id) },
    });

    return res.json({
      deletedFamiliars,
      deletedColors,
      deletedAccessories,
      deletedSenshi,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
