'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Star, BookOpen, Menu, Github, Zap, Sparkles, Search, Command } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useBookmarks } from '@/hooks/useBookmarks'
import { Squash as Hamburger } from "hamburger-react";

const navigation = [
  { name: 'Explore', href: '/', icon: Search },
  { name: 'Categories', href: '/categories', icon: Zap },
  { name: 'Trending', href: '/trending', icon: Sparkles },
  { name: 'About', href: '/about', icon: BookOpen },
]

export function Header() {
  const { bookmarks } = useBookmarks()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-strong border-b border-border/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">
                AwesomeHub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/50 transition-all duration-200 group"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Command shortcut hint */}
            <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
              <Command className="w-3 h-3" />
              <span>⌘K</span>
            </div>

            {/* GitHub Link */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden sm:flex hover:bg-accent/50"
            >
              <a
                href="https://github.com/nafisreza/awesome-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span className="hidden lg:inline">Star on GitHub</span>
              </a>
            </Button>

            {/* Bookmarks */}
            <Button
              variant="outline"
              size="sm"
              asChild
              className="relative overflow-hidden group border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            >
              <Link href="/bookmarks" className="flex items-center gap-2">
                <Star className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Bookmarks</span>
                {bookmarks.length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-1 bg-primary/10 text-primary border-primary/20 px-1.5 py-0.5 text-xs animate-pulse-glow"
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
                <div className="fixed left-0 shadow-4xl right-0 top-[4rem] p-5 pt-0 bg-white border-b border-b-white/20 z-50">
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2 py-2">
                    {navigation.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent/50 transition-colors group"
                        >
                          <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="mt-auto pt-6 border-t border-border/50 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/bookmarks" onClick={() => setIsMobileMenuOpen(false)}>
                        <Star className="w-4 h-4 mr-2" />
                        Bookmarks
                        {bookmarks.length > 0 && (
                          <Badge variant="secondary" className="ml-auto">
                            {bookmarks.length}
                          </Badge>
                        )}
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <a
                        href="https://github.com/nafisreza/awesome-hub"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Star on GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
