import express from "express";
import asyncHandler from "express-async-handler";
import {
  CreateSenshi,
  DeleteSenshi,
  GetAllSenshis,
  GetSenshiById,
  UpdateSenshi,
} from "../../controllers/senshi.controller";

const router = express.Router();

router.post("/", asyncHandler(CreateSenshi));
router.patch("/:id", asyncHandler(UpdateSenshi));
router.get("/:id", asyncHandler(GetSenshiById));
router.get("/", asyncHandler(GetAllSenshis));
router.delete("/:id", asyncHandler(DeleteSenshi));

export default router;
