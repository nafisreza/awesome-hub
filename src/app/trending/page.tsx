import { Metadata } from 'next';
import { TrendingPage } from './trending-page';

export const metadata: Metadata = {
  title: 'Trending - Awesome Hub',
  description: 'Discover trending GitHub repositories gaining popularity. Find the hottest projects in the awesome lists ecosystem.',
  keywords: ['github', 'trending', 'popular repositories', 'awesome lists', 'hot projects', 'github trends'],
  openGraph: {
    title: 'Trending - Awesome Hub',
    description: 'Discover trending GitHub repositories gaining popularity. Find the hottest projects in the awesome lists ecosystem.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trending - Awesome Hub',
    description: 'Discover trending GitHub repositories gaining popularity. Find the hottest projects.',
  },
};

export default function Trending() {
  return <TrendingPage />;
}