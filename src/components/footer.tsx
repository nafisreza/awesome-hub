'use client'
import React from 'react'
import Link from 'next/link'

const links = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/search' },
    { name: 'Bookmarks', href: '/bookmarks' },
    { name: 'Browse Categories', href: '/' },
    { name: 'Trending Repos', href: '/' },
]

const resources = [
    { name: 'Contributing Guide', href: '/contributing-guide' },
    { name: 'Documentation', href: '/documentation' },
    { name: 'License', href: '/privacy-policy' },
    { name: 'Feature Requests', href: '/terms-of-service' },
    { name: 'Bug Reports', href: '/bug-reports' },
]

function Footer() {
    return (
        <footer className='bg-gray-100 text-center p-4 mt-10 border-t border-gray-300'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-2 text-sm md:text-lg lg:text-base lg:space-y-1 text-gray-900'>
                <div id="Awesome Hub" className='flex-auto text-center md:text-left md:px-5'>
                    <p className='font-bold py-4 lg:text-xl'>Awesome Hub</p>
                    <p className='font-semibold'>The Universe of Awesome Lists</p>
                    <p>One hub to explore the best open-source projects and <span><br /></span>developer resources across the GitHub universe.</p>
                </div>
                <div className='flex flex-col md:flex-row justify-around md:flex-row grow gap-6'>
                    <div id='Quick Links' className='flex flex-col self-center text-center mt-4'>
                        <p className='font-bold py-4 px-4 text-lg'>Quick Links</p>
                        <nav className="flex flex-col items-center gap-1">
                            {links.map((item) => {
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/50 transition-all duration-200 group"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                    <div id='Resources' className='flex flex-col self-center text-center mt-4'>
                        <p className='font-bold py-4 px-4 text-lg'>Resources</p>
                        <nav className="flex flex-col items-center gap-1">
                            {resources.map((item) => {
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/50 transition-all duration-200 group"
                                    >
                                        {item.name}
                                    </a>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
