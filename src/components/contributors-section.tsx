"use client";

import { useEffect, useState } from "react";
import { Users, ExternalLink, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContributorsSkeleton } from "@/components/skeletons/ContributorsSkeleton";
import { GitHubContributor } from "@/lib/github";

export function ContributorsSection() {
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    return null; // Gracefully hide section if API fails
  }

  // Show top 12 contributors on the main page
  const displayedContributors = contributors.slice(0, 12);

  return (
    <section className="py-16 px-6 relative">
      {/* Background elements */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Community
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Our Amazing Contributors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the talented developers who make AwesomeHub possible. Thank you
            for your contributions!
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
          {displayedContributors.map((contributor, index) => (
            <Card
              key={contributor.login}
              className="group glass-strong border-0 hover-lift relative overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => window.open(contributor.html_url, "_blank")}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="p-4 relative flex flex-col items-center">
                {/* Avatar */}
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary transition-all duration-300 group-hover:scale-110">
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Contribution badge */}
                  <Badge
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 bg-primary/90 text-primary-foreground text-xs px-1.5 py-0.5 min-w-[24px] justify-center"
                  >
                    {contributor.contributions}
                  </Badge>
                </div>

                {/* Username */}
                <div className="text-center w-full">
                  <p className="text-sm font-medium text-foreground truncate mb-1 group-hover:text-primary transition-colors">
                    {contributor.login}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contributor.contributions}{" "}
                    {contributor.contributions === 1
                      ? "contribution"
                      : "contributions"}
                  </p>
                </div>

                {/* External link icon on hover */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3 h-3 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer with stats and link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 glass-strong rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {contributors.length}
              </p>
              <p className="text-sm text-muted-foreground">
                Total Contributors
              </p>
            </div>
          </div>

          <Button
            variant="default"
            className="group"
            onClick={() =>
              window.open(
                "https://github.com/nafisreza/awesome-hub/graphs/contributors",
                "_blank",
              )
            }
          >
            View All Contributors
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
