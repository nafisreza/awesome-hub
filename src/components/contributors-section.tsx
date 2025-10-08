"use client";

import { useEffect, useState } from "react";
import { Users, ExternalLink, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContributorsSkeleton } from "@/components/skeletons/ContributorsSkeleton";
import { GitHubContributor } from "@/lib/github";

export function ContributorsSection() {
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/contributors");
        if (!response.ok) throw new Error("Failed to fetch contributors");
        const data = await response.json();
        setContributors(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching contributors:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return <ContributorsSkeleton />;
  }

  if (error || contributors.length === 0) {
    return null;
  }

  // Show 14 contributors on the main page (2 rows of 7)
  const displayedContributors = contributors.slice(0, 14);

  return (
    <section className="relative overflow-hidden py-24 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary px-4 py-2 text-sm font-medium rounded-full">
            <Heart className="w-4 h-4 mr-2 inline animate-pulse" />
            Built with Love by the Community
          </Badge>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-300 dark:to-gray-100">
              Our Amazing Contributors
            </span>
          </h2>
          
          <p className="text-lg md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meet the talented developers making AwesomeHub possible. Every contribution, big or small, helps build something incredible.
          </p>
        </div>

        {/* All Contributors Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 space-y-3 place-items-center sm:gap-1 max-w-xl mx-auto">
            {displayedContributors.map((contributor, index) => (
              <a
                key={contributor.login}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                  animation: "fadeIn 0.5s ease-out forwards",
                  animationDelay: `${index * 0.03}s`,
                  opacity: 0
                }}
              >
                {/* Tooltip on hover */}
                {hoveredIndex === index && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10 px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-xl border border-border whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                    <div className="text-sm font-semibold">{contributor.login}</div>
                    <div className="text-xs text-muted-foreground">
                      {contributor.contributions} {contributor.contributions === 1 ? "contribution" : "contributions"}
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-popover border-r border-b border-border" />
                  </div>
                )}

                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-4 group-hover:ring-primary transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Contribution count badge */}
                  <div className="absolute -bottom-1 -left-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shadow-lg ring-2 ring-background">
                    {contributor.contributions > 99 ? "99+" : contributor.contributions}
                  </div>
                </div>
              </a>
            ))}
            
          </div>
        </div>

        {/* Footer Stats Card */}
        <div className="relative glass-strong rounded-2xl p-6 md:p-8 border border-border/50 overflow-hidden max-w-[800px] mx-auto">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {contributors.length}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    Total Contributors
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px ml-0 sm:ml-5 h-16 bg-border" />

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {contributors.reduce((sum, c) => sum + c.contributions, 0)}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    Total Contributions
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="group relative overflow-hidden w-full sm:w-auto"
              onClick={() =>
                window.open(
                  "https://github.com/nafisreza/awesome-hub/graphs/contributors",
                  "_blank",
                )
              }
            >
              <span className="relative z-10 flex items-center gap-2">
                View All on GitHub
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
