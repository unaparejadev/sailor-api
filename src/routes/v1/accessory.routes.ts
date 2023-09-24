import express from "express";
import asyncHandler from "express-async-handler";
import {
  GetAccessoryById,
  GetAllAccessories,
} from "../../controllers/accessory.controller";

const router = express.Router();

router.get("/:id", asyncHandler(GetAccessoryById));
router.get("/", asyncHandler(GetAllAccessories));

export default router;
