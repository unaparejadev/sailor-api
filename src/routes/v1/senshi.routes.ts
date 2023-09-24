import express from 'express';
import asyncHandler from 'express-async-handler';
import { GetAllSenshis } from '../../controllers/senshi.controller';

const router = express.Router();

router.get('/', asyncHandler(GetAllSenshis));

export default router;
