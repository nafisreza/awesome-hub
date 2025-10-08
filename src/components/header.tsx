'use client';

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Star, Github, Zap, Sparkles, Search, Command } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useBookmarks } from '@/hooks/useBookmarks'
import { Squash as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import { ModeToggle } from './ui/mode';


const navigation = [
  { name: 'Explore', href: '/', icon: Search },
  { name: 'Categories', href: '/categories', icon: Zap },
  { name: 'Trending', href: '/trending', icon: Sparkles },
];

export function Header() {
  const { bookmarks } = useBookmarks();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'glass-strong border-border/50 border-b shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">AwesomeHub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/50 group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                >
                  <IconComponent className="h-4 w-4 transition-transform group-hover:scale-110" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          

          {/* Actions */}
          <div className="flex items-center gap-3">
          <ModeToggle/>
            {/* GitHub Link */}
            <Button variant="ghost" size="sm" asChild className="hover:bg-accent/50 hidden sm:flex">
              <a
                href="https://github.com/nafisreza/awesome-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                <span className="hidden lg:inline">Star on GitHub</span>
              </a>
            </Button>

            {/* Bookmarks */}
            <Button
              variant="outline"
              size="sm"
              asChild
              className="group border-primary/20 hover:border-primary/40 hover:bg-primary/5 relative overflow-hidden"
            >
              <Link href="/bookmarks" className="flex items-center gap-2">
                <Star className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">Bookmarks</span>
                {bookmarks.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 animate-pulse-glow ml-1 px-1.5 py-0.5 text-xs"
                  >
                    {bookmarks.length}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu */}
            <div className='lg:hidden'>
            <Hamburger toggled={isMobileMenuOpen} size={20} toggle={setIsMobileMenuOpen} />
              { isMobileMenuOpen && 
              <>
               <motion.div
                  key="mobile-menu"
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="fixed left-0 right-0 top-[4rem] p-5 pt-0 bg-background border-b border-border/20 shadow-4xl z-50"
                >
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2 py-2">
                    {navigation.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="hover:bg-accent/50 group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                        >
                          <IconComponent className="h-5 w-5 transition-transform group-hover:scale-110" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="border-border/50 mt-auto space-y-3 border-t pt-6">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/bookmarks" onClick={() => setIsMobileMenuOpen(false)}>
                        <Star className="mr-2 h-4 w-4" />
                        Bookmarks
                        {bookmarks.length > 0 && (
                          <Badge variant="secondary" className="ml-auto">
                            {bookmarks.length}
                          </Badge>
                        )}
                      </Link>
                    </Button>

                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="https://github.com/nafisreza/awesome-hub" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Star on GitHub
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
