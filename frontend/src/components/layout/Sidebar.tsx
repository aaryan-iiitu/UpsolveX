'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  BookOpen,
  Settings,
  LogOut,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  className?: string;
}

const sidebarLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/contests', label: 'Contests', icon: BarChart3 },
  { href: '/problems', label: 'Problems', icon: BookOpen },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-64px)] bg-secondary/50 border-r transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      <div className="flex flex-col h-full p-4">
        {/* Links */}
        <nav className="space-y-2 flex-1">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition',
                isCollapsed ? 'justify-center' : ''
              )}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button className={cn(
          'flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-destructive/10 transition w-full',
          isCollapsed ? 'justify-center' : ''
        )}>
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
