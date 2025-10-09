'use client';

import { useState, useEffect } from 'react';
import { Search, Code, Smartphone, Globe, Database, Shield, Zap, Cpu, Layers, Bot, Cloud, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryCard } from '@/components/category-card';


interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  topics: string[];
  count?: number;
}

const categories: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'React, Vue, Angular, and modern frontend frameworks',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    topics: ['react', 'vue', 'angular', 'svelte', 'frontend', 'javascript', 'typescript'],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'APIs, servers, and backend frameworks',
    icon: Code,
    color: 'from-green-500 to-emerald-500',
    topics: ['nodejs', 'express', 'fastapi', 'django', 'backend', 'api'],
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    description: 'iOS, Android, and cross-platform mobile apps',
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    topics: ['react-native', 'flutter', 'swift', 'kotlin', 'mobile', 'ios', 'android'],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'TensorFlow, PyTorch, and AI/ML libraries',
    icon: Bot,
    color: 'from-orange-500 to-red-500',
    topics: ['machine-learning', 'tensorflow', 'pytorch', 'ai', 'ml', 'deep-learning'],
  },
  {
    id: 'devops',
    name: 'DevOps & Infrastructure',
    description: 'Docker, Kubernetes, CI/CD, and deployment tools',
    icon: Cloud,
    color: 'from-indigo-500 to-blue-500',
    topics: ['docker', 'kubernetes', 'devops', 'ci-cd', 'deployment', 'infrastructure'],
  },
  {
    id: 'database',
    name: 'Databases',
    description: 'SQL, NoSQL, and database management systems',
    icon: Database,
    color: 'from-teal-500 to-green-500',
    topics: ['database', 'sql', 'mongodb', 'redis', 'postgresql', 'mysql'],
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Cybersecurity, encryption, and security tools',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    topics: ['security', 'cybersecurity', 'encryption', 'authentication', 'privacy'],
  },
  {
    id: 'web3',
    name: 'Web3 & Blockchain',
    description: 'Blockchain, cryptocurrency, and decentralized apps',
    icon: Layers,
    color: 'from-yellow-500 to-orange-500',
    topics: ['blockchain', 'web3', 'cryptocurrency', 'smart-contracts', 'defi'],
  },
  {
    id: 'system-programming',
    name: 'System Programming',
    description: 'Low-level programming, compilers, and system tools',
    icon: Cpu,
    color: 'from-gray-500 to-slate-600',
    topics: ['rust', 'go', 'c', 'cpp', 'system-programming', 'compiler'],
  },
  {
    id: 'tools',
    name: 'Developer Tools',
    description: 'IDEs, editors, CLI tools, and productivity apps',
    icon: Zap,
    color: 'from-violet-500 to-purple-500',
    topics: ['tools', 'cli', 'productivity', 'editor', 'ide', 'utility'],
  },
  {
    id: 'design',
    name: 'Design & UI/UX',
    description: 'Design systems, icons, animations, and UI libraries',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    topics: ['design', 'ui', 'ux', 'icons', 'animation', 'design-system'],
  },
  {
    id: 'games',
    name: 'Game Development',
    description: 'Game engines, frameworks, and development tools',
    icon: Zap,
    color: 'from-emerald-500 to-teal-500',
    topics: ['gamedev', 'unity', 'unreal', 'godot', 'games', 'graphics'],
  },
];

const CategorySkeleton = () => (
  <Card className="relative overflow-hidden">
    <CardHeader>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
    </CardContent>
  </Card>
);

export function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch repository counts for each category
    const fetchCategoryCounts = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategoryCounts(data.categoryCounts || {});
        }
      } catch (error) {
        console.error('Error fetching category counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-12 lg:px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Browse by Category
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover amazing GitHub repositories organized by technology, framework, and domain.
            Find the perfect tools and libraries for your next project.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeletons
            [...Array(12)].map((_, index) => <CategorySkeleton key={index} />)
          ) : (
            filteredCategories.map((category) => {
              const count = categoryCounts[category.id] || 0;
              
              return (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  icon={category.icon}
                  color={category.color}
                  topics={category.topics}
                  count={count}
                />
              );
            })
          )}
        </div>

        {/* No results */}
        {!loading && filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}