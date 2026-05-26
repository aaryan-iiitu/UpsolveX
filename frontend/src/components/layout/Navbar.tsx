'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={cn(
      'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur',
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            UpsolveX
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="hover:text-primary transition">
              Dashboard
            </Link>
            <Link href="/contests" className="hover:text-primary transition">
              Contests
            </Link>
            <Link href="/problems" className="hover:text-primary transition">
              Problems
            </Link>
            <Link href="/profile" className="hover:text-primary transition">
              Profile
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-secondary rounded">
              Dashboard
            </Link>
            <Link href="/contests" className="block px-4 py-2 hover:bg-secondary rounded">
              Contests
            </Link>
            <Link href="/problems" className="block px-4 py-2 hover:bg-secondary rounded">
              Problems
            </Link>
            <Link href="/profile" className="block px-4 py-2 hover:bg-secondary rounded">
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
