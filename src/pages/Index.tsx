
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductGrid />
    </div>
  );
};

export default Index;
