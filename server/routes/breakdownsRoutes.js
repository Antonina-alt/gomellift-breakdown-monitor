import { Router } from 'express';
import { getBreakdowns, importBreakdowns } from '../controllers/breakdownsController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { importApiKeyGuard } from '../middleware/importApiKeyGuard.js';

const router = Router();

router.get('/', asyncHandler(getBreakdowns));
router.post('/import', importApiKeyGuard, asyncHandler(importBreakdowns));

export default router;
