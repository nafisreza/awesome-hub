'use client'

import Link from 'next/link'
import {
  Github,
  FileText,
  Star,
  Tag,
  Search as SearchIcon,
  Bug
} from 'lucide-react'

export function Footer () {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      aria-labelledby='footer-heading'
      className='bg-card border-t border-border fixed bottom-0 left-0 right-0 z-50 shadow-md text-foreground'
    >
      <div className='container mx-auto px-4 lg:px-6 py-4 min-h-[72px]'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div>
            <h3 className='text-xl font-bold'>AwesomeHub</h3>
            <p className='text-sm text-muted-foreground mt-2'>
              The Universe of Awesome Lists
            </p>
            <p className='text-sm text-muted-foreground mt-3'>
              A centralized hub to discover and explore curated "awesome"
              repositories across GitHub.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-sm font-semibold mb-3'>Quick Links</h4>
            <ul className='space-y-2 text-sm' aria-label='Quick links'>
              <li>
                <Link
                  href='/'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='Home'
                >
                  <SearchIcon className='w-4 h-4' /> Home
                </Link>
              </li>
              <li>
                <Link
                  href='/search'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='Search'
                >
                  <Tag className='w-4 h-4' /> Search
                </Link>
              </li>
              <li>
                <Link
                  href='/bookmarks'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='Bookmarks'
                >
                  <Star className='w-4 h-4' /> Bookmarks
                </Link>
              </li>
              <li>
                <Link
                  href='/categories'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='Browse categories'
                >
                  <Tag className='w-4 h-4' /> Browse Categories
                </Link>
              </li>
              <li>
                <Link
                  href='/trending'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='Trending repositories'
                >
                  <SearchIcon className='w-4 h-4' /> Trending Repos
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className='text-sm font-semibold mb-3'>Resources</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/CONTRIBUTING.md'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='Contributing guide'
                >
                  <FileText className='w-4 h-4' /> Contributing Guide
                </Link>
              </li>
              <li>
                <Link
                  href='/LICENSE'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='License'
                >
                  <FileText className='w-4 h-4' /> License
                </Link>
              </li>
              <li>
                <a
                  href='https://github.com/nafisreza/awesome-hub'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='GitHub repository'
                >
                  <Github className='w-4 h-4' /> GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/nafisreza/awesome-hub/issues/new?assignees=&labels=feature&template=feature_request.md&title='
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='Feature requests'
                >
                  <Star className='w-4 h-4' /> Feature Requests
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/nafisreza/awesome-hub/issues/new?assignees=&labels=bug&template=bug_report.md&title='
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:text-foreground'
                  aria-label='Bug reports'
                >
                  <Bug className='w-4 h-4' /> Bug Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h4 className='text-sm font-semibold mb-3'>Project</h4>
            <p className='text-sm text-muted-foreground'>
              Maintained by Nafis Reza
            </p>
            <div className='mt-4 text-sm'>
              <p className='text-muted-foreground'>
                © {currentYear} AwesomeHub. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div className='mt-4 pt-4 border-t border-border text-center text-sm text-muted-foreground'>
          <p>
            Built with ❤️ ·{' '}
            <a
              href='https://github.com/nafisreza/awesome-hub'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-foreground'
            >
              Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
