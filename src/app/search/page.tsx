'use client'

import { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SearchResults } from '@/components/search-results'
import {
  GitHubService,
  type GitHubRepo as Repository,
  type SearchFilters
} from '@/lib/github'

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'react', label: 'React' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'security', label: 'Security' },
  { value: 'devops', label: 'DevOps' },
  { value: 'css', label: 'CSS' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' }
]

function useDebouncedValue<T> (value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

function SearchPageContent () {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  )
  const [searchResults, setSearchResults] = useState<Repository[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const debouncedQuery = useDebouncedValue(searchQuery, 300)
  const abortRef = useRef<AbortController | null>(null)

  const saveToHistory = (q: string) => {
    try {
      const raw = localStorage.getItem('searchHistory') || '[]'
      const list = JSON.parse(raw) as string[]
      const normalized = q.trim()
      if (!normalized) return
      // dedupe
      const next = [normalized, ...list.filter(i => i !== normalized)].slice(
        0,
        10
      )
      localStorage.setItem('searchHistory', JSON.stringify(next))
    } catch {}
  }

  const fetchResults = useCallback(
    async (query: string, category: string, page = 1, append = false) => {
      try {
        if (abortRef.current) abortRef.current.abort()
        const ac = new AbortController()
        abortRef.current = ac

        if (page === 1) {
          setIsSearching(true)
          setError(null)
        } else {
          setIsLoadingMore(true)
        }

        const params = new URLSearchParams()
        if (query.trim()) params.set('q', query.trim())
        if (category && category !== 'all') params.set('category', category)
        params.set('page', String(page))
        params.set('per_page', '10')

        const res = await fetch(`/api/search?${params.toString()}`, {
          signal: ac.signal
        })
        if (!res.ok) throw new Error('Search failed')
        const data = await res.json()

        const items: Repository[] = data.items || []
        if (append && page > 1) setSearchResults(prev => [...prev, ...items])
        else setSearchResults(items)

        setCurrentPage(page)
        setHasMore(items.length >= 10)
        setHasSearched(true)
        setError(null)
        if (page === 1) saveToHistory(query)
      } catch (err) {
        if ((err as any).name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Failed to search')
      } finally {
        setIsSearching(false)
        setIsLoadingMore(false)
      }
    },
    []
  )

  // Effect: fire search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim() && selectedCategory === 'all') return
    fetchResults(debouncedQuery, selectedCategory, 1, false)
  }, [debouncedQuery, selectedCategory, fetchResults])

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      fetchResults(searchQuery, selectedCategory, currentPage + 1, true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      fetchResults(searchQuery, selectedCategory, 1, false)
    }
  }

  // Search on page load if query params exist
  useEffect(() => {
    const q = searchParams.get('q')
    const c = searchParams.get('category') || 'all'
    setSearchQuery(q || '')
    setSelectedCategory(c)
    if (q || c !== 'all') fetchResults(q || '', c, 1, false)
  }, [searchParams, fetchResults])

  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <Button
            variant='ghost'
            onClick={() => router.push('/')}
            className='mb-4'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Home
          </Button>
          <h1 className='text-2xl font-bold'>Search Results</h1>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Search Sidebar */}
          <div className='lg:col-span-1'>
            <Card className='sticky top-8'>
              <CardContent className='p-6'>
                <h2 className='text-lg font-semibold mb-4'>Search</h2>

                <div className='space-y-4'>
                  {/* Search Input */}
                  <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                    <Input
                      type='text'
                      placeholder='Search repositories...'
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className='pl-10'
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Category
                    </label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className='w-full bg-background/50 border-border/50'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <Button
                    onClick={() =>
                      fetchResults(searchQuery, selectedCategory, 1, false)
                    }
                    disabled={isSearching}
                    className='w-full'
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>

                  {/* Error Message */}
                  {error && (
                    <div className='p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm'>
                      {error}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className='lg:col-span-3'>
            <SearchResults
              results={searchResults}
              isLoading={isSearching}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
              searchQuery={searchQuery}
              category={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchPageFallback () {
  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='mb-8'>
          <div className='w-20 h-4 bg-muted animate-pulse rounded mb-4' />
          <div className='w-40 h-8 bg-muted animate-pulse rounded' />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-1'>
            <div className='w-full h-80 bg-muted animate-pulse rounded' />
          </div>
          <div className='lg:col-span-3'>
            <div className='text-center py-12'>
              <div className='w-12 h-12 bg-muted animate-pulse rounded mx-auto mb-4' />
              <div className='w-32 h-6 bg-muted animate-pulse rounded mx-auto mb-2' />
              <div className='w-64 h-4 bg-muted animate-pulse rounded mx-auto' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage () {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  )
}
