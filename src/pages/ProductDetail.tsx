import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Check, ShoppingBag } from 'lucide-react';
import { sampleProducts } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = sampleProducts.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found.</p>
          <Link to="/catalog" className="text-sm text-accent hover:underline">
            Back to collections
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addItem(product, selectedSize, quantity);
    setAdded(true);
    toast.success(`${product.name} added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 lg:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back link */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 active:scale-95"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <ScrollReveal>
              <div className="relative overflow-hidden bg-secondary rounded-sm aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {hasDiscount && (
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm">
                    {discountPercent}% Off
                  </span>
                )}
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal delay={120}>
              <div className="flex flex-col justify-center">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  {product.category}
                </p>
                <h1 className="font-display text-2xl lg:text-4xl font-semibold text-foreground leading-tight mb-4">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-xl lg:text-2xl font-semibold text-foreground">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {hasDiscount && (
                    <span className="text-base text-muted-foreground line-through">
                      ₹{product.originalPrice!.toLocaleString('en-IN')}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="text-xs font-medium text-accent">
                      Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Size selector */}
                <div className="mb-6">
                  <p className="text-xs font-medium tracking-wide uppercase text-foreground mb-3">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-10 px-4 text-sm rounded-sm border transition-all active:scale-95 ${
                          selectedSize === size
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-8">
                  <p className="text-xs font-medium tracking-wide uppercase text-foreground mb-3">
                    Available Colors
                  </p>
                  <p className="text-sm text-muted-foreground">{product.colors.join(', ')}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-8">
                  <p className="text-xs font-medium tracking-wide uppercase text-foreground">
                    Qty
                  </p>
                  <div className="flex items-center border border-border rounded-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2.5 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {product.stock} in stock
                  </span>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full h-12 rounded-sm text-sm font-medium tracking-wide uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    added
                      ? 'bg-green-800 text-white'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Add to Cart — ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </>
                  )}
                </button>

                {/* Extra info */}
                <div className="mt-8 pt-6 border-t border-border space-y-3">
                  <p className="text-xs text-muted-foreground">✦ Free shipping on orders above ₹2,999</p>
                  <p className="text-xs text-muted-foreground">✦ Easy 7-day returns & exchanges</p>
                  <p className="text-xs text-muted-foreground">✦ Handcrafted with care in India</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
