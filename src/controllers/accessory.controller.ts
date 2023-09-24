import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllAccessories: RequestHandler = async (req, res) => {
  const accessories = await prisma.accessory.findMany();

  res.json(accessories);
};

export const GetAccessoryById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: `Invalid ID: ${id}` });
  }

  const accessory = await prisma.accessory.findUnique({
    where: { id: Number(id) },
    include: {
      senshi: true,
    },
  });

  if (accessory) {
    return res.json(accessory);
  }

  return res
    .status(404)
    .json({ error: `Accessory with ID ${id} does not exist` });
};
