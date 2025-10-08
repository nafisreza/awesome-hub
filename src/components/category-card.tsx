import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  topics: string[];
  count?: number;
}

export function CategoryCard({ id, name, description, icon: IconComponent, color, topics, count }: CategoryCardProps) {
  return (
    <Link href={`/search?category=${id}`}>
      <Card className="group hover-lift glass-strong relative overflow-hidden border-0 transition-all duration-500 hover:shadow-2xl cursor-pointer">
        {/* Gradient background */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />
        
        {/* Shimmer effect */}
        <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-100" />
        
        <CardHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2.5 rounded-lg bg-gradient-to-br ${color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                {name}
              </CardTitle>
              {count && count > 0 && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {count.toLocaleString()} repos
                </Badge>
              )}
            </div>
          </div>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative pt-0">
          {/* Popular topics */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {topics.slice(0, 3).map((topic, index) => (
              <Badge
                key={topic}
                variant="outline"
                className="text-xs px-2 py-1 bg-background/50 hover:bg-primary/10 transition-colors duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {topic}
              </Badge>
            ))}
            {topics.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1 bg-background/50">
                +{topics.length - 3}
              </Badge>
            )}
          </div>
          
          {/* Explore button */}
          <div className="text-primary group-hover:text-primary/80 text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span>Explore repositories</span>
            <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}