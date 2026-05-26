import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Truncate string to specified length
 */
export function truncate(str: string, length: number = 50) {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Calculate percentage
 */
export function calculatePercentage(part: number, total: number) {
  if (total === 0) return 0;
  return ((part / total) * 100).toFixed(2);
}

/**
 * Get difficulty color
 */
export function getDifficultyColor(difficulty: string) {
  const colors: Record<string, string> = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    hard: 'text-red-600 bg-red-100',
    expert: 'text-purple-600 bg-purple-100',
  };
  return colors[difficulty.toLowerCase()] || 'text-gray-600 bg-gray-100';
}

/**
 * Get verdict color
 */
export function getVerdictColor(verdict: string) {
  const colors: Record<string, string> = {
    AC: 'text-green-600',
    WA: 'text-red-600',
    TLE: 'text-orange-600',
    MLE: 'text-orange-600',
    RE: 'text-red-600',
    CE: 'text-red-600',
  };
  return colors[verdict] || 'text-gray-600';
}
