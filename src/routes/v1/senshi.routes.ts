import express from "express";
import asyncHandler from "express-async-handler";
import {
  GetAllSenshis,
  GetSenshiById,
} from "../../controllers/senshi.controller";

const router = express.Router();

router.get("/:id", asyncHandler(GetSenshiById));
router.get("/", asyncHandler(GetAllSenshis));

export default router;
