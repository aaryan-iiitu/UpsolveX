import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';
import { ApiError } from '../utils/response';

const prisma = new PrismaClient();

export class ContestService {
  async getContestsByUserId(userId: string, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [contests, total] = await Promise.all([
        prisma.contest.findMany({
          where: { userId },
          include: {
            submissions: true,
            analysis: true,
          },
          orderBy: { startTime: 'desc' },
          skip,
          take: limit,
        }),
        prisma.contest.count({ where: { userId } }),
      ]);

      return {
        contests,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error('Error fetching contests:', error);
      throw error;
    }
  }

  async getContestById(contestId: string) {
    try {
      const contest = await prisma.contest.findUnique({
        where: { id: contestId },
        include: {
          submissions: true,
          analysis: true,
        },
      });

      if (!contest) {
        throw new ApiError('Contest not found', 404);
      }

      return contest;
    } catch (error) {
      logger.error('Error fetching contest:', error);
      throw error;
    }
  }

  async createContest(data: {
    userId: string;
    contestId: string;
    name: string;
    platform: string;
    rating?: number;
    rank?: number;
    ratingChange?: number;
    startTime: Date;
    endTime: Date;
    isVirtual?: boolean;
  }) {
    try {
      return await prisma.contest.create({
        data,
        include: {
          submissions: true,
          analysis: true,
        },
      });
    } catch (error) {
      logger.error('Error creating contest:', error);
      throw error;
    }
  }

  async analyzeContest(contestId: string) {
    try {
      const contest = await this.getContestById(contestId);

      const submissions = await prisma.submission.findMany({
        where: { contestId },
      });

      const solvedCount = submissions.filter((s) => s.verdict === 'AC').length;
      const accuracy = submissions.length
        ? (solvedCount / submissions.length) * 100
        : 0;

      return {
        totalProblems: submissions.length,
        solvedCount,
        accuracy: accuracy.toFixed(2),
        recommendations: this.generateRecommendations(contest, submissions),
      };
    } catch (error) {
      logger.error('Error analyzing contest:', error);
      throw error;
    }
  }

  private generateRecommendations(contest: any, submissions: any[]) {
    const recommendations: string[] = [];

    if (submissions.length === 0) {
      recommendations.push('Practice more problems');
    } else {
      const failedCount = submissions.filter((s) => s.verdict !== 'AC').length;
      if (failedCount > 0) {
        recommendations.push('Review failed submissions');
        recommendations.push('Study the editorial for unsolved problems');
      }
    }

    return recommendations;
  }
}

export const contestService = new ContestService();
