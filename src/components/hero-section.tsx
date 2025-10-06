'use client'

import { Sparkles, Zap, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative pt-12 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      
      {/* Interactive cursor spotlight */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)/0.1), transparent 40%)`
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Badge */}
        <div className="mb-8">
          <Badge variant="secondary" className=" px-4 py-2 text-sm font-medium border border-gray-300 rounded-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Hacktoberfest 2025 • Open Source
          </Badge>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-gray-700 mb-2">AwesomeHub</span>
          <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
            The Universe of Awesome Lists
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover, explore, and curate the most incredible collections on GitHub. 
          From cutting-edge frameworks to mind-blowing resources – everything awesome, 
          beautifully organized.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90 px-8 py-4 text-lg transition-all duration-300 hover-lift">
            <span className="relative z-10">Explore Collections</span>
            <Zap className="ml-2 w-5 h-5" />
          </Button>
          
          <Button size="lg" variant="outline" className="glass hover-lift px-8 py-4 text-lg group">
            <Trophy className="mr-2 w-5 h-5" />
            Contribute
            <div className="ml-2 px-2 py-1 bg-primary/10 rounded-full text-xs">
              +1K
            </div>
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
  )
}