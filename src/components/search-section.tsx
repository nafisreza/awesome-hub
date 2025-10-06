'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Hash, Zap, Globe, Code, Database, Shield, Server } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command as CommandPrimitive, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const categories = [
  { value: 'all', label: 'All Categories', icon: Globe, color: 'from-blue-500 to-purple-500' },
  { value: 'javascript', label: 'JavaScript', icon: Code, color: 'from-yellow-400 to-yellow-600' },
  { value: 'python', label: 'Python', icon: Code, color: 'from-green-400 to-green-600' },
  { value: 'react', label: 'React', icon: Code, color: 'from-cyan-400 to-cyan-600' },
  { value: 'machine-learning', label: 'Machine Learning', icon: Database, color: 'from-purple-500 to-pink-500' },
  { value: 'security', label: 'Security', icon: Shield, color: 'from-red-500 to-orange-500' },
  { value: 'devops', label: 'DevOps', icon: Server, color: 'from-blue-600 to-indigo-600' },
  { value: 'css', label: 'CSS', icon: Code, color: 'from-pink-400 to-red-400' },
  { value: 'go', label: 'Go', icon: Code, color: 'from-cyan-500 to-blue-500' },
  { value: 'rust', label: 'Rust', icon: Code, color: 'from-orange-500 to-red-500' },
];

const trendingSearches = [
  'awesome-react', 'awesome-python', 'awesome-javascript', 'awesome-ai', 
  'awesome-golang', 'awesome-rust', 'awesome-vue', 'awesome-nodejs'
];

export function SearchSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigateToSearch = useCallback(
    (category?: string) => {
      setError(null);

      if (!searchQuery.trim() && (category ?? selectedCategory) === 'all') {
        setError('Please enter a search term or select a category');
        return;
      }

      // Build search params
      const params = new URLSearchParams();
      if (searchQuery.trim()) {
        params.set('q', searchQuery.trim());
      }
      if ((category ?? selectedCategory) !== 'all') {
        params.set('category', category ?? selectedCategory);
      }

      // Navigate to search page
      router.push(`/search?${params.toString()}`);
    }, [router, searchQuery, selectedCategory]);

  const handleSearch = useCallback(
    (category?: string) => {
      navigateToSearch(category);
    }, [navigateToSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsCommandOpen(true);
    }
  };

  return (
    <section className="relative pb-16 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Discover • Explore • Create
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Find Your Perfect Repository
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search through thousands of curated awesome lists and discover resources that will supercharge your development journey.
            </p>
          </div> */}

        {/* Search Interface */}
        <Card className="glass-strong border-0 p-8 mb-8">
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* Main Search Bar */}
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-xl transition-opacity ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
                <div className="relative flex items-center">
                  <div className="absolute left-4 z-10">
                    <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search awesome repositories... (⌘K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="pl-12 pr-4 py-4 text-lg bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-lg transition-all"
                  />

                  {/* Command shortcut */}
                  <div className="absolute right-4 hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘</kbd>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">K</kbd>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full bg-background/50 border-border/50">
                      <div className="flex items-center gap-2">
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                            <category.icon className="w-4 h-4" />
                            <span>{category.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:w-auto">
                  <label className="block text-sm font-medium text-muted-foreground mb-2 md:invisible">Action</label>
                  <Button
                    onClick={() => handleSearch()}
                    size="lg"
                    className="w-full md:w-auto px-8 transition-all duration-300 group"
                  >
                    <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Trending Searches */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground font-medium">Trending:</span>
                  {trendingSearches.slice(0, 4).map((search, index) => (
                    <Badge
                      key={search}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors animate-float"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSearchQuery(search)}
                    >
                      <Hash className="w-3 h-3 mr-1" />
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Command Palette */}
        <Popover open={isCommandOpen} onOpenChange={setIsCommandOpen}>
          <PopoverTrigger asChild>
            <div />
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="center">
            <CommandPrimitive className="rounded-lg border shadow-md">
              <CommandInput placeholder="Search repositories..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Categories">
                  {categories.map((category) => (
                    <CommandItem
                      key={category.value}
                      onSelect={() => {
                        setSelectedCategory(category.value);
                        setIsCommandOpen(false);
                      }}
                    >
                      <category.icon className="mr-2 h-4 w-4" />
                      <span>{category.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="Quick Searches">
                  {trendingSearches.map((search) => (
                    <CommandItem
                      key={search}
                      onSelect={() => {
                        setSearchQuery(search);
                        setIsCommandOpen(false);
                      }}
                    >
                      <Hash className="mr-2 h-4 w-4" />
                      <span>{search}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </CommandPrimitive>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}
