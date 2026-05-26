import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middleware';

const router = Router();

// User profile routes
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// User statistics routes
router.get('/stats', authMiddleware, userController.getUserStats);

// User preferences routes
router.get('/preferences', authMiddleware, userController.getUserPreferences);
router.put(
  '/preferences',
  authMiddleware,
  userController.updateUserPreferences,
);

export default router;
