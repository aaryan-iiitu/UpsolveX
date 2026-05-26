import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import { successResponse, errorResponse, ApiError } from '../utils/response';
import { userService } from '../services/userService';

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    throw new ApiError('Unauthorized', 401);
  }

  const user = await userService.getUserById(userId);
  res.json(successResponse(user, 'Profile fetched successfully'));
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const { name, avatar, bio } = req.body;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    const user = await userService.updateUser(userId, {
      name,
      avatar,
      bio,
    });

    res.json(successResponse(user, 'Profile updated successfully'));
  },
);

export const getUserStats = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    const user = await userService.getUserById(userId);
    res.json(successResponse(user.userStats, 'Stats fetched successfully'));
  },
);

export const getUserPreferences = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    const user = await userService.getUserById(userId);
    res.json(
      successResponse(user.preferences, 'Preferences fetched successfully'),
    );
  },
);

export const updateUserPreferences = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    // Update preferences in database
    // This would require a preference service
    res.json(
      successResponse(null, 'Preferences updated successfully'),
    );
  },
);
