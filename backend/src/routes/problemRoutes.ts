import { Router } from 'express';
import * as problemController from '../controllers/problemController';
import { authMiddleware } from '../middleware';

const router = Router();

// Problem routes
router.get('/', authMiddleware, problemController.getProblems);
router.get('/solved', authMiddleware, problemController.getSolvedProblems);
router.get('/difficulty/:difficulty', authMiddleware, problemController.getProblemsByDifficulty);
router.get('/:problemId', authMiddleware, problemController.getProblemById);
router.post('/', authMiddleware, problemController.createProblem);
router.put(
  '/:problemId/progress',
  authMiddleware,
  problemController.updateProblemProgress,
);

export default router;
