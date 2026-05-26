'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Problem } from '@/types';
import { getDifficultyColor } from '@/lib/utils';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {problem.solved && <CheckCircle2 size={20} className="text-green-600" />}
              {problem.name}
            </CardTitle>
            <CardDescription>{problem.platform}</CardDescription>
          </div>
          {problem.difficulty && (
            <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty.toUpperCase()}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {problem.tags && problem.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {problem.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {problem.tags.length > 3 && (
              <span className="text-xs bg-secondary px-2 py-1 rounded">
                +{problem.tags.length - 3}
              </span>
            )}
          </div>
        )}
        {problem.link && (
          <Link href={problem.link} target="_blank" className="text-primary hover:underline text-sm">
            View Problem →
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
