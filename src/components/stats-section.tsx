'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, BookOpen, Zap, Star, GitFork, Activity, Target } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

interface Stats {
  repositories: number;
  totalStars: number;
  totalForks: number;
  categories: number;
  contributors: number;
}

const statConfigs = [
  {
    key: 'repositories' as keyof Stats,
    label: 'Repositories',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    description: 'Curated lists',
    growth: '+12%'
  },
  {
    key: 'totalStars' as keyof Stats,
    label: 'Total Stars',
    icon: Star,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    description: 'Community love',
    growth: '+24%'
  },
  {
    key: 'categories' as keyof Stats,
    label: 'Categories',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    description: 'Tech domains',
    growth: '+8%'
  },
  {
    key: 'contributors' as keyof Stats,
    label: 'Contributors',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    description: 'Active developers',
    growth: '+18%'
  }
];

export function StatsSection() {
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState<Stats>({
    repositories: 0,
    totalStars: 0,
    totalForks: 0,
    categories: 0,
    contributors: 0,
  });
  const [progressValues, setProgressValues] = useState<Record<keyof Stats, number>>({
    repositories: 0,
    totalStars: 0,
    totalForks: 0,
    categories: 0,
    contributors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        
        // Animate numbers with easing
        const animateValue = (key: keyof Stats, target: number, delay: number = 0) => {
          setTimeout(() => {
            let current = 0;
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function (ease-out)
              const easedProgress = 1 - Math.pow(1 - progress, 3);
              current = Math.floor(target * easedProgress);
              
              setAnimatedStats(prev => ({ ...prev, [key]: current }));
              
              // Animate progress bar
              const progressPercent = Math.min((current / target) * 100, 100);
              setProgressValues(prev => ({ ...prev, [key]: progressPercent }));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            animate();
          }, delay);
        };

        // Start animations with staggered delays
        animateValue('repositories', data.repositories, 200);
        animateValue('totalStars', data.totalStars, 400);
        animateValue('categories', data.categories, 600);
        animateValue('contributors', data.contributors, 800);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="glass-strong border-0 p-6">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-4 w-16 mb-4" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 relative">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Activity className="w-4 h-4" />
            Real-time Statistics
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Platform Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the scale and impact of our awesome community through live metrics and engagement data.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statConfigs.map((config, index) => {
            const value = animatedStats[config.key];
            const progress = progressValues[config.key];
            const IconComponent = config.icon;
            
            return (
              <Card 
                key={config.key} 
                className="group glass-strong border-0 hover-lift relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${config.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-6 h-6 bg-gradient-to-r ${config.color} bg-clip-text text-transparent`} />
                    </div>
                    
                    <Badge 
                      variant="secondary" 
                      className="bg-green-500/10 text-green-600 border-green-200 px-2 py-1 text-xs"
                    >
                      {config.growth}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                      {formatNumber(value)}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {config.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {config.description}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress 
                      value={progress} 
                      className="h-2 bg-muted/50"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--muted)) 0%, hsl(var(--muted)) ${progress}%, hsl(var(--muted)/0.5) ${progress}%, hsl(var(--muted)/0.5) 100%)`
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-strong border-0 p-6 text-center">
            <CardContent className="p-0">
              <div className="p-3 bg-blue-500/10 rounded-xl w-fit mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-xl font-bold text-gray-700 mb-2">98.5%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-0 p-6 text-center">
            <CardContent className="p-0">
              <div className="p-3 bg-green-500/10 rounded-xl w-fit mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-xl font-bold text-gray-700 mb-2">2.4M</div>
              <div className="text-sm text-muted-foreground">Monthly Views</div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-0 p-6 text-center">
            <CardContent className="p-0">
              <div className="p-3 bg-purple-500/10 rounded-xl w-fit mx-auto mb-4">
                <GitFork className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-xl font-bold text-gray-700 mb-2">156K</div>
              <div className="text-sm text-muted-foreground">Total Forks</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
