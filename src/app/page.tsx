import { SearchSection } from "@/components/search-section";
import { HeroSection } from "@/components/hero-section";
import { FeaturedRepos } from "@/components/featured-repos";
import { StatsSection } from "@/components/stats-section";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { SearchSection } from '@/components/search-section';
import { HeroSection } from '@/components/hero-section';
import { FeaturedRepos } from '@/components/featured-repos';
import { StatsSection } from '@/components/stats-section';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      {/* Add top padding to account for fixed header */}
      <main className="">
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
