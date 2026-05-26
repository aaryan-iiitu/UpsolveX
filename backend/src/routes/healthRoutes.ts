import { Router } from 'express';
import { successResponse } from '../utils/response';

const router = Router();

router.get('/health', (req, res) => {
  res.json(successResponse(null, 'Server is running'));
});

export default router;
