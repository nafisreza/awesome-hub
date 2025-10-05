'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Star, BookOpen, Menu, Github, Zap, Sparkles, Search, Command, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useBookmarks } from '@/hooks/useBookmarks'

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
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Respect system preference on first visit and save to localStorage on change
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (!saved) {
      // next-themes will set system by default; nothing to do here
      return
    }
    setTheme(saved)
  }, [setTheme])

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
            {/* Theme toggle */}
            <button
              aria-label="Toggle dark mode"
              onClick={() => {
                const next = resolvedTheme === 'dark' ? 'light' : 'dark'
                setTheme(next)
                try { localStorage.setItem('theme', next) } catch {}
              }}
              className="p-2 rounded-md hover:bg-accent/10 transition-colors"
            >
              {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
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
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 glass-strong">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold text-gradient">AwesomeHub</span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2 py-6">
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
