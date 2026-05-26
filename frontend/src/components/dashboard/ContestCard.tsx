'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { Contest } from '@/types';
import Link from 'next/link';

interface ContestCardProps {
  contest: Contest;
}

export function ContestCard({ contest }: ContestCardProps) {
  const ratingChangeColor = contest.ratingChange ? contest.ratingChange > 0 ? 'text-green-600' : 'text-red-600' : '';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{contest.name}</CardTitle>
            <CardDescription>{contest.platform}</CardDescription>
          </div>
          <span className="text-sm font-medium bg-secondary px-3 py-1 rounded">
            {contest.isVirtual ? 'Virtual' : 'Official'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Rating</p>
            <p className="text-xl font-bold">{contest.rating || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Rank</p>
            <p className="text-xl font-bold">#{contest.rank || '-'}</p>
          </div>
          {contest.ratingChange && (
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Rating Change</p>
              <p className={`text-lg font-bold ${ratingChangeColor}`}>
                {contest.ratingChange > 0 ? '+' : ''}{contest.ratingChange}
              </p>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          {formatDate(contest.startTime)}
        </p>
        <Link href={`/contests/${contest.id}`} className="text-primary hover:underline text-sm">
          View Details →
        </Link>
      </CardContent>
    </Card>
  );
}
