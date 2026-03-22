import { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { sampleProducts, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let products = [...sampleProducts];
    if (selectedCategory) {
      products = products.filter((p) => p.category === selectedCategory);
    }
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
    }
    return products;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 lg:pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-10">
              <h1 className="font-display text-3xl lg:text-5xl font-semibold text-foreground mb-2">
                Collections
              </h1>
              <p className="text-muted-foreground text-sm">
                {filtered.length} pieces
              </p>
            </div>
          </ScrollReveal>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors active:scale-95"
            >
              <Filter size={16} />
              Filters
              {selectedCategory && (
                <span className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0.5 rounded-sm ml-1">1</span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent text-muted-foreground border-none outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-8 reveal-fade">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-xs px-4 py-2 rounded-sm border transition-colors active:scale-95 ${
                    !selectedCategory
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-foreground'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`text-xs px-4 py-2 rounded-sm border transition-colors active:scale-95 ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:border-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={12} /> Clear filters
                </button>
              )}
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 80}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category.</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-3 text-sm text-accent hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
