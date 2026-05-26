'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { UserStats } from '@/types';

interface StatsOverviewProps {
  stats: UserStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      label: 'Total Contests',
      value: stats.totalContests,
      icon: '🏆',
    },
    {
      label: 'Problems Attempted',
      value: stats.totalProblems,
      icon: '📝',
    },
    {
      label: 'Problems Solved',
      value: stats.solvedProblems,
      icon: '✅',
    },
    {
      label: 'Current Rating',
      value: stats.currentRating,
      icon: '📊',
    },
    {
      label: 'Max Rating',
      value: stats.maxRating,
      icon: '🎯',
    },
    {
      label: 'Accuracy',
      value: `${stats.accuracy.toFixed(1)}%`,
      icon: '🎖️',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
