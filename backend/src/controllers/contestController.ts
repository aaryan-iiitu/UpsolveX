import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import { successResponse, ApiError } from '../utils/response';
import { contestService } from '../services/contestService';

export const getContests = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    const result = await contestService.getContestsByUserId(
      userId,
      page,
      limit,
    );

    res.json(successResponse(result, 'Contests fetched successfully'));
  },
);

export const getContestById = asyncHandler(
  async (req: Request, res: Response) => {
    const { contestId } = req.params;

    const contest = await contestService.getContestById(contestId);

    res.json(successResponse(contest, 'Contest fetched successfully'));
  },
);

export const createContest = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const {
      contestId,
      name,
      platform,
      rating,
      rank,
      ratingChange,
      startTime,
      endTime,
      isVirtual,
    } = req.body;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    const contest = await contestService.createContest({
      userId,
      contestId,
      name,
      platform,
      rating,
      rank,
      ratingChange,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      isVirtual,
    });

    res.status(201).json(successResponse(contest, 'Contest created successfully', 201));
  },
);

export const analyzeContest = asyncHandler(
  async (req: Request, res: Response) => {
    const { contestId } = req.params;

    const analysis = await contestService.analyzeContest(contestId);

    res.json(
      successResponse(analysis, 'Contest analysis completed successfully'),
    );
  },
);
