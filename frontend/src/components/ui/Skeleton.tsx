'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className, count = 1 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'rounded-lg bg-muted animate-pulse',
            className
          )}
        />
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <LoadingSkeleton className="h-8 w-32 mb-4" />
      <LoadingSkeleton className="h-20 w-full mb-4" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function ContestCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <LoadingSkeleton className="h-6 w-40 mb-3" />
      <LoadingSkeleton className="h-4 w-20 mb-4" />
      <div className="grid grid-cols-2 gap-4">
        <LoadingSkeleton className="h-12" />
        <LoadingSkeleton className="h-12" />
      </div>
    </div>
  );
}
