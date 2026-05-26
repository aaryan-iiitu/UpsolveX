import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';
import { ApiError } from '../utils/response';

const prisma = new PrismaClient();

export class ProblemService {
  async getProblemsByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    try {
      const skip = (page - 1) * limit;

      const [problems, total] = await Promise.all([
        prisma.problem.findMany({
          where: { userId },
          include: {
            submissions: true,
            recommendations: true,
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.problem.count({ where: { userId } }),
      ]);

      return {
        problems,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error fetching problems:', error);
      throw error;
    }
  }

  async getProblemById(problemId: string) {
    try {
      const problem = await prisma.problem.findUnique({
        where: { id: problemId },
        include: {
          submissions: true,
          recommendations: true,
        },
      });

      if (!problem) {
        throw new ApiError('Problem not found', 404);
      }

      return problem;
    } catch (error) {
      logger.error('Error fetching problem:', error);
      throw error;
    }
  }

  async createProblem(data: {
    userId: string;
    externalId: string;
    platform: string;
    name: string;
    link?: string;
    difficulty?: string;
    tags?: string[];
    statement?: string;
  }) {
    try {
      return await prisma.problem.create({
        data,
        include: {
          submissions: true,
          recommendations: true,
        },
      });
    } catch (error) {
      logger.error('Error creating problem:', error);
      throw error;
    }
  }

  async updateProblemProgress(
    problemId: string,
    solved: boolean,
    solveDate?: Date,
  ) {
    try {
      return await prisma.problem.update({
        where: { id: problemId },
        data: {
          solved,
          solveDate: solved ? solveDate || new Date() : null,
        },
      });
    } catch (error) {
      logger.error('Error updating problem:', error);
      throw error;
    }
  }

  async getSolvedProblems(userId: string) {
    try {
      return await prisma.problem.findMany({
        where: {
          userId,
          solved: true,
        },
      });
    } catch (error) {
      logger.error('Error fetching solved problems:', error);
      throw error;
    }
  }

  async getProblemsByDifficulty(userId: string, difficulty: string) {
    try {
      return await prisma.problem.findMany({
        where: {
          userId,
          difficulty,
        },
      });
    } catch (error) {
      logger.error('Error fetching problems by difficulty:', error);
      throw error;
    }
  }
}

export const problemService = new ProblemService();
