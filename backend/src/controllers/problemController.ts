import { Request, Response } from 'express';
import { asyncHandler } from '../utils/errorHandler';
import { successResponse, ApiError } from '../utils/response';
import { problemService } from '../services/problemService';

export const getProblems = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    const result = await problemService.getProblemsByUserId(
      userId,
      page,
      limit,
    );

    res.json(successResponse(result, 'Problems fetched successfully'));
  },
);

export const getProblemById = asyncHandler(
  async (req: Request, res: Response) => {
    const { problemId } = req.params;

    const problem = await problemService.getProblemById(problemId);

    res.json(successResponse(problem, 'Problem fetched successfully'));
  },
);

export const createProblem = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const { externalId, platform, name, link, difficulty, tags, statement } =
      req.body;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    const problem = await problemService.createProblem({
      userId,
      externalId,
      platform,
      name,
      link,
      difficulty,
      tags,
      statement,
    });

    res.status(201).json(
      successResponse(problem, 'Problem created successfully', 201),
    );
  },
);

export const updateProblemProgress = asyncHandler(
  async (req: Request, res: Response) => {
    const { problemId } = req.params;
    const { solved, solveDate } = req.body;

    const problem = await problemService.updateProblemProgress(
      problemId,
      solved,
      solveDate ? new Date(solveDate) : undefined,
    );

    res.json(
      successResponse(problem, 'Problem progress updated successfully'),
    );
  },
);

export const getSolvedProblems = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    const problems = await problemService.getSolvedProblems(userId);

    res.json(
      successResponse(
        { count: problems.length, problems },
        'Solved problems fetched successfully',
      ),
    );
  },
);

export const getProblemsByDifficulty = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const { difficulty } = req.params;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    const problems = await problemService.getProblemsByDifficulty(
      userId,
      difficulty,
    );

    res.json(
      successResponse(
        { difficulty, count: problems.length, problems },
        'Problems fetched successfully',
      ),
    );
  },
);
