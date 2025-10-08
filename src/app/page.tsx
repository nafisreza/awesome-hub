import { SearchSection } from "@/components/search-section";
import { HeroSection } from "@/components/hero-section";
import { FeaturedRepos } from "@/components/featured-repos";
import { StatsSection } from "@/components/stats-section";
import { Header } from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Add top padding to account for fixed header */}
      <main className="pt-16">
        <HeroSection />
        <SearchSection />
        <div className="container mx-auto px-4 lg:px-6">
          <FeaturedRepos />
        </div>
        <StatsSection />
        {/* Footer spacer */}
        <Footer />
      </main>
    </div>
  );
}
