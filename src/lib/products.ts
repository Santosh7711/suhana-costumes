import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
}

export const categories = [
  'Sarees',
  'Lehengas',
  'Kurta Sets',
  'Anarkalis',
  'Palazzo Sets',
  'Sharara Sets',
] as const;

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Bridal Lehenga',
    price: 48500,
    originalPrice: 62000,
    category: 'Lehengas',
    image: product1,
    description: 'Handcrafted red bridal lehenga with intricate gold zari embroidery. A timeless piece for your special day.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Maroon'],
    stock: 8,
    featured: true,
  },
  {
    id: '2',
    name: 'Ivory Elegance Kurta',
    price: 4200,
    category: 'Kurta Sets',
    image: product2,
    description: 'Minimalist ivory kurta set with delicate pink accents. Perfect for casual gatherings.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Blush'],
    stock: 24,
    featured: true,
  },
  {
    id: '3',
    name: 'Kanjivaram Silk Saree',
    price: 18900,
    originalPrice: 22000,
    category: 'Sarees',
    image: product3,
    description: 'Pure Kanjivaram silk saree in deep maroon with gold zari border. Heritage weaving at its finest.',
    sizes: ['Free Size'],
    colors: ['Maroon', 'Wine'],
    stock: 12,
    featured: true,
  },
  {
    id: '4',
    name: 'Festive Anarkali Suit',
    price: 12800,
    category: 'Anarkalis',
    image: product4,
    description: 'Floor-length anarkali in rich crimson with contrast dupatta. Statement wear for celebrations.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Crimson', 'Teal'],
    stock: 15,
    featured: false,
  },
  {
    id: '5',
    name: 'Embroidered Palazzo Set',
    price: 6400,
    originalPrice: 8200,
    category: 'Palazzo Sets',
    image: product5,
    description: 'Earthy palazzo set with hand-embroidered border details. Effortless style for every occasion.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sand', 'Mustard'],
    stock: 30,
    featured: true,
  },
  {
    id: '6',
    name: 'Designer Sharara Set',
    price: 9600,
    category: 'Sharara Sets',
    image: product6,
    description: 'Contemporary sharara set in ivory with blush block prints. Modern heritage for the discerning woman.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Peach'],
    stock: 18,
    featured: true,
  },
];
