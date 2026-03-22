import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2">
          <h3 className="font-display text-2xl font-semibold mb-4">Suhana Costumes</h3>
          <p className="text-primary-foreground/70 max-w-md leading-relaxed text-sm">
            Curating timeless Indian fashion for the modern woman. Every piece tells a story of heritage, craftsmanship, and contemporary elegance.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg font-medium mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {['Collections', 'New Arrivals', 'About Us', 'Contact'].map((item) => (
              <Link key={item} to="/catalog" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-medium mb-4">Support</h4>
          <div className="flex flex-col gap-2.5">
            {['Shipping & Returns', 'Size Guide', 'Care Instructions', 'FAQ'].map((item) => (
              <span key={item} className="text-sm text-primary-foreground/60 cursor-pointer hover:text-primary-foreground transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center">
        <p className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Suhana Costumes. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
