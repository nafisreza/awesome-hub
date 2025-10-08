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
    growth: '+12%',
  },
  {
    key: 'totalStars' as keyof Stats,
    label: 'Total Stars',
    icon: Star,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    description: 'Community love',
    growth: '+24%',
  },
  {
    key: 'categories' as keyof Stats,
    label: 'Categories',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    description: 'Tech domains',
    growth: '+8%',
  },
  {
    key: 'contributors' as keyof Stats,
    label: 'Contributors',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    description: 'Active developers',
    growth: '+18%',
  },
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

              setAnimatedStats((prev) => ({ ...prev, [key]: current }));

              // Animate progress bar
              const progressPercent = Math.min((current / target) * 100, 100);
              setProgressValues((prev) => ({
                ...prev,
                [key]: progressPercent,
              }));

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
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <Skeleton className="mx-auto mb-4 h-8 w-64" />
            <Skeleton className="mx-auto h-6 w-96" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="glass-strong border-0 p-6">
                <CardContent className="p-0">
                  <div className="mb-4 flex items-center justify-between">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                  <Skeleton className="mb-2 h-8 w-20" />
                  <Skeleton className="mb-4 h-4 w-16" />
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
    <section className="relative px-6 py-16">
      {/* Background elements */}
      <div className="gradient-mesh absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Activity className="h-4 w-4" />
            Real-time Statistics
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-700 md:text-4xl">Platform Insights</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Discover the scale and impact of our awesome community through live metrics and engagement data.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statConfigs.map((config, index) => {
            const value = animatedStats[config.key];
            const progress = progressValues[config.key];
            const IconComponent = config.icon;

            return (
              <Card
                key={config.key}
                className="group glass-strong hover-lift relative overflow-hidden border-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                />

                <CardContent className="relative p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`p-3 ${config.bgColor} rounded-xl transition-transform duration-300 group-hover:scale-110`}
                    >
                      <IconComponent
                        className={`h-6 w-6 bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}
                      />
                    </div>

                    <Badge
                      variant="secondary"
                      className="border-green-200 bg-green-500/10 px-2 py-1 text-xs text-green-600"
                    >
                      {config.growth}
                    </Badge>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div
                      className={`bg-gradient-to-r text-3xl font-bold ${config.color} bg-clip-text text-transparent`}
                    >
                      {formatNumber(value)}
                    </div>
                    <div className="text-foreground text-sm font-medium">{config.label}</div>
                    <div className="text-muted-foreground text-xs">{config.description}</div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress
                      value={progress}
                      className="bg-muted/50 h-2"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--muted)) 0%, hsl(var(--muted)) ${progress}%, hsl(var(--muted)/0.5) ${progress}%, hsl(var(--muted)/0.5) 100%)`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="glass-strong border-0 p-6 text-center">
            <CardContent className="p-0">
              <div className="mx-auto mb-4 w-fit rounded-xl bg-blue-500/10 p-3">
                <Target className="h-6 w-6 text-blue-500" />
              </div>
              <div className="mb-2 text-xl font-bold text-gray-700">98.5%</div>
              <div className="text-muted-foreground text-sm">Uptime</div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-0 p-6 text-center">
            <CardContent className="p-0">
              <div className="mx-auto mb-4 w-fit rounded-xl bg-green-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div className="mb-2 text-xl font-bold text-gray-700">2.4M</div>
              <div className="text-muted-foreground text-sm">Monthly Views</div>
            </CardContent>
          </Card>

          <Card className="glass-strong border-0 p-6 text-center">
            <CardContent className="p-0">
              <div className="mx-auto mb-4 w-fit rounded-xl bg-purple-500/10 p-3">
                <GitFork className="h-6 w-6 text-purple-500" />
              </div>
              <div className="mb-2 text-xl font-bold text-gray-700">156K</div>
              <div className="text-muted-foreground text-sm">Total Forks</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
