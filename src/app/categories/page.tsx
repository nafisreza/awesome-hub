import { Metadata } from 'next';
import { CategoriesPage } from './categories-page';

export const metadata: Metadata = {
  title: 'Categories - Awesome Hub',
  description: 'Discover GitHub repositories by category. Browse curated collections of awesome projects organized by technology, framework, and domain.',
  keywords: ['github', 'repositories', 'categories', 'awesome lists', 'programming', 'development'],
  openGraph: {
    title: 'Categories - Awesome Hub',
    description: 'Discover GitHub repositories by category. Browse curated collections of awesome projects.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Categories - Awesome Hub',
    description: 'Discover GitHub repositories by category. Browse curated collections of awesome projects.',
  },
};

export default function Categories() {
  return <CategoriesPage />;
}