import { useState, useEffect } from 'react'
import { GitHubRepo as Repository } from '@/lib/github';

const BOOKMARKS_KEY = 'bookmarks';

export function useBookmarks() {
  // State to store the list of bookmarked repositories
  const [bookmarks, setBookmarks] = useState<Repository[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]') 
       setBookmarks(stored) 
  }, [])

  const addBookmark = (repo: Repository) => {
    const newBookmarks = [...bookmarks, repo] 
    setBookmarks(newBookmarks)               
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks)) 
  }

  const removeBookmark = (id: number) => {
    const updated = bookmarks.filter(b => b.id !== id) 
    setBookmarks(updated)                              
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated)) 
  }

  const isBookmarked = (repoId: number) => bookmarks.some(r => r.id === repoId)

  // Return the state and functions for use in components
  return { bookmarks, addBookmark, removeBookmark, isBookmarked }
}
