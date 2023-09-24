import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllFamiliars: RequestHandler = async (req, res) => {
  const familiars = await prisma.familiar.findMany();

  res.json(familiars);
};

export const GetFamiliarsById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: `Invalid ID: ${id}` });
  }

  const familiar = await prisma.familiar.findUnique({
    where: { id: Number(id) },
    include: {
      senshi: true,
    },
  });

  if (familiar) {
    return res.json(familiar);
  }

  return res
    .status(404)
    .json({ error: `Familiar with ID ${id} does not exist` });
};
