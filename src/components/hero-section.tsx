'use client';

import { Sparkles, Zap, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-12">
      {/* Animated Background */}
      <div className="gradient-mesh absolute inset-0 opacity-60" />

      {/* Interactive cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)/0.1), transparent 40%)`,
        }}
      />

      {/* Floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/30 animate-float absolute top-20 left-20 h-2 w-2 rounded-full" />
        <div
          className="bg-accent/40 animate-float absolute top-40 right-32 h-1 w-1 rounded-full"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="bg-primary/20 animate-float absolute bottom-32 left-1/4 h-3 w-3 rounded-full"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="bg-accent/30 animate-float absolute right-20 bottom-20 h-1.5 w-1.5 rounded-full"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      <div
        className={`relative z-10 mx-auto max-w-6xl px-6 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Badge */}
        <div className="mb-8">
          <Badge variant="secondary" className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium">
            <Sparkles className="mr-2 h-4 w-4" />
            Hacktoberfest 2025 • Open Source
          </Badge>
        </div>

        {/* Main heading */}
        <h1 className="mb-6 text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
          <span className="mb-2 block text-gray-700">AwesomeHub</span>
          <span className="text-muted-foreground block text-2xl font-medium md:text-3xl lg:text-4xl">
            The Universe of Awesome Lists
          </span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-lg leading-relaxed md:text-xl">
          Discover, explore, and curate the most incredible collections on GitHub. From cutting-edge frameworks to
          mind-blowing resources – everything awesome, beautifully organized.
        </p>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group bg-primary hover:bg-primary/90 hover-lift relative overflow-hidden px-8 py-4 text-lg transition-all duration-300"
          >
            <span className="relative z-10">Explore Collections</span>
            <Zap className="ml-2 h-5 w-5" />
          </Button>

          <Button size="lg" variant="outline" className="glass hover-lift group px-8 py-4 text-lg">
            <Trophy className="mr-2 h-5 w-5" />
            Contribute
            <div className="bg-primary/10 ml-2 rounded-full px-2 py-1 text-xs">+1K</div>
          </Button>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="glass-strong rounded-2xl p-6 hover-lift group">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-700 mb-1">2.5M+</div>
            <div className="text-sm text-muted-foreground">Total Stars</div>
          </div>

          <div className="glass-strong rounded-2xl p-6 hover-lift group">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform">
                <GitFork className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-700 mb-1">15K+</div>
            <div className="text-sm text-muted-foreground">Repositories</div>
          </div>

          <div className="glass-strong rounded-2xl p-6 hover-lift group">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-green-500/10 rounded-xl group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-700 mb-1">200+</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
