import express from "express";
import asyncHandler from "express-async-handler";
import {
  GetAllFamiliars,
  GetFamiliarsById,
} from "../../controllers/familiar.controller";

const router = express.Router();

router.get("/:id", asyncHandler(GetFamiliarsById));
router.get("/", asyncHandler(GetAllFamiliars));

export default router;
