import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-model.jpg';
import { sampleProducts, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const featured = sampleProducts.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-20 lg:pt-0 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal-up order-2 lg:order-1">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 stagger-1 reveal-fade">
                New Collection 2026
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-[0.95] tracking-tight mb-6">
                Elegance,
                <br />
                Reimagined
              </h1>
              <p className="text-muted-foreground max-w-md leading-relaxed mb-8 text-sm lg:text-base">
                Discover curated collections that bridge heritage craftsmanship with contemporary silhouettes. Each piece, a testament to timeless artistry.
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-accent transition-colors active:scale-[0.97] duration-200"
              >
                Explore Collection
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="order-1 lg:order-2 reveal-fade stagger-2">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={heroImage}
                  alt="Suhana Costumes - Elegant Indian fashion"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-3">
                Shop by Category
              </h2>
              <p className="text-muted-foreground text-sm">Find your perfect look</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat} delay={i * 80}>
                <Link
                  to="/catalog"
                  className="group block bg-secondary hover:bg-accent/10 border border-border rounded-sm px-6 py-8 lg:py-10 text-center transition-all duration-300 active:scale-[0.97]"
                >
                  <span className="font-display text-lg lg:text-xl text-foreground group-hover:text-accent transition-colors">
                    {cat}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                  Curated Picks
                </h2>
                <p className="text-muted-foreground text-sm">Handpicked for you this season</p>
              </div>
              <Link
                to="/catalog"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featured.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 100}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-primary text-primary-foreground rounded-sm px-8 py-14 lg:px-16 lg:py-20 text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-4">
                The Bridal Edit
              </h2>
              <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8 text-sm lg:text-base">
                From engagement to reception — discover our complete bridal trousseau, crafted to make every moment unforgettable.
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-gold-light transition-colors active:scale-[0.97]"
              >
                Explore Bridal
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
