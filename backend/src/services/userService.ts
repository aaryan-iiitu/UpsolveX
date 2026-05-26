import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';
import { ApiError } from '../utils/response';

const prisma = new PrismaClient();

export class UserService {
  async getUserById(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          userStats: true,
          preferences: true,
        },
      });

      if (!user) {
        throw new ApiError('User not found', 404);
      }

      return user;
    } catch (error) {
      logger.error('Error fetching user:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      logger.error('Error fetching user by email:', error);
      throw error;
    }
  }

  async createUser(data: { email: string; name?: string; avatar?: string }) {
    try {
      const user = await prisma.user.create({
        data,
        include: {
          userStats: true,
          preferences: true,
        },
      });

      // Initialize user stats and preferences
      await Promise.all([
        prisma.userStats.create({
          data: { userId: user.id },
        }),
        prisma.userPreferences.create({
          data: { userId: user.id },
        }),
      ]);

      return user;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(
    userId: string,
    data: { name?: string; avatar?: string; bio?: string },
  ) {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data,
        include: {
          userStats: true,
          preferences: true,
        },
      });
    } catch (error) {
      logger.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(userId: string) {
    try {
      return await prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      logger.error('Error deleting user:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
