import { Router } from 'express';
import * as contestController from '../controllers/contestController';
import { authMiddleware } from '../middleware';

const router = Router();

// Contest routes
router.get('/', authMiddleware, contestController.getContests);
router.get('/:contestId', authMiddleware, contestController.getContestById);
router.post('/', authMiddleware, contestController.createContest);
router.get(
  '/:contestId/analyze',
  authMiddleware,
  contestController.analyzeContest,
);

export default router;
