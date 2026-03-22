import { Link } from 'react-router-dom';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <Link to={`/catalog`} className="group block">
      <div className="relative overflow-hidden bg-secondary rounded-sm aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3.5 space-y-1">
        <h3 className="font-body text-sm font-medium text-foreground group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.originalPrice!.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
