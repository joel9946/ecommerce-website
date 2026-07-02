'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

const ALL_PRODUCTS = [
  { 
    id: '1', 
    name: 'Zenitsu Lightning Drop-Shoulder Tee', 
    price: 1099, 
    originalPrice: 1599, 
    badge: 'BEST SELLER', 
    graphicColor: '#D4FF00', 
    category: 'Anime', 
    sizes: ['M', 'L', 'XL'], 
    rating: 4.9, 
    reviewsCount: 154, 
    image: '/images/11_17386de2-0138-468a-b616-8019451fa26b.webp'
  },
  { 
    id: '2', 
    name: 'Gas Mask Shinigami Cream Tee', 
    price: 1099, 
    originalPrice: 1599, 
    badge: 'NEW DROP', 
    graphicColor: '#E5D3B3', 
    category: 'Anime', 
    sizes: ['S', 'M', 'L', 'XL'], 
    rating: 4.8, 
    reviewsCount: 88, 
    image: '/images/zoom_0-1739428581.avif'
  },
  { 
    id: '3', 
    name: 'Anime Eyes Multicharacter Tee', 
    price: 999, 
    originalPrice: 1499, 
    badge: 'POPULAR', 
    graphicColor: '#FFB7C5', 
    category: 'Anime', 
    sizes: ['M', 'L', '2XL'], 
    rating: 5.0, 
    reviewsCount: 92, 
    image: '/images/8_b3650bcd-7a35-4191-bda0-9b4e526329de.webp'
  },
  { 
    id: '4', 
    name: 'Graffiti Teddy Streetwear Tee', 
    price: 1099, 
    originalPrice: 1599, 
    badge: '10% OFF', 
    graphicColor: '#0D0D0D', 
    category: 'Graphic', 
    sizes: ['S', 'M', 'XL', '2XL'], 
    rating: 4.7, 
    reviewsCount: 112, 
    image: '/images/Artboard_5_1_2.webp'
  },
  { 
    id: '5', 
    name: 'Yuta & Rika Cursed Energy Tee', 
    price: 1099, 
    originalPrice: 1699, 
    badge: '', 
    graphicColor: '#F3F4F6', 
    category: 'Anime', 
    sizes: ['S', 'M', 'L'], 
    rating: 4.6, 
    reviewsCount: 45, 
    image: '/images/81ofupTz8TL._AC_UY1100_.jpg'
  },
  { 
    id: '6', 
    name: 'Cybernetic Exoskeleton Spine Tee', 
    price: 1199, 
    originalPrice: 1799, 
    badge: 'FUTURE', 
    graphicColor: '#3B82F6', 
    category: 'Graphic', 
    sizes: ['M', 'L', 'XL', '2XL'], 
    rating: 4.8, 
    reviewsCount: 57, 
    image: '/images/edit-kj-v-7.webp'
  },
  { 
    id: '7', 
    name: 'Love With No Limits Tropical Tee', 
    price: 999, 
    originalPrice: 1399, 
    badge: '', 
    graphicColor: '#1B4332', 
    category: 'Minimalist', 
    sizes: ['S', 'M', 'L', 'XL'], 
    rating: 4.9, 
    reviewsCount: 73, 
    image: '/images/1781935523397-eaa6b2865a45441a-DA13E7C1884FE912E711D3FFB60D9AA2.webp'
  },
  { 
    id: '8', 
    name: 'Vaporwave Skull Sneaker Tee', 
    price: 999, 
    originalPrice: 1499, 
    badge: 'POPULAR', 
    graphicColor: '#0D0D0D', 
    category: 'Minimalist', 
    sizes: ['M', 'L', 'XL'], 
    rating: 4.7, 
    reviewsCount: 81, 
    image: '/images/Oversize_Back_Printed_oversize_t_shirt_for_men_-_FastColors_-_Oversize_Back_Printed_T-Shirt_-_FastColors_-_tag1_-_tag2_-_tag3_-_-6266647.webp'
  },
  { 
    id: '9', 
    name: 'Woops Stay Sick Cartoon Tee', 
    price: 999, 
    originalPrice: 1499, 
    badge: '', 
    graphicColor: '#FF2E23', 
    category: 'Graphic', 
    sizes: ['S', 'M', 'L', 'XL'], 
    rating: 4.5, 
    reviewsCount: 38, 
    image: '/images/Artboard25_74.webp'
  },
  { 
    id: '10', 
    name: 'Break the Rules Distressed Tee', 
    price: 999, 
    originalPrice: 1499, 
    badge: 'POPULAR', 
    graphicColor: '#0D0D0D', 
    category: 'Graphic', 
    sizes: ['M', 'L', 'XL', '2XL'], 
    rating: 4.6, 
    reviewsCount: 64, 
    image: '/images/Black_Printed_oversize_t_shirt_for_men_-_FastColors_-_Oversize_Printed_T-Shirt_-_FastColors_-_tag1_-_tag2_-_tag3_-_-6265988.webp'
  },
  { 
    id: '11', 
    name: 'Retro SWAG Pop-Art Collage Tee', 
    price: 1099, 
    originalPrice: 1599, 
    badge: '', 
    graphicColor: '#0D0D0D', 
    category: 'Graphic', 
    sizes: ['M', 'L', 'XL'], 
    rating: 4.8, 
    reviewsCount: 51, 
    image: '/images/b_0119493a-9927-4550-8323-baefe5f625c0.webp'
  },
  { 
    id: '12', 
    name: 'Berserk Menace Screaming Tee', 
    price: 1199, 
    originalPrice: 1799, 
    badge: 'HOT DROP', 
    graphicColor: '#3B82F6', 
    category: 'Graphic', 
    sizes: ['S', 'M', 'L', 'XL', '2XL'], 
    rating: 4.9, 
    reviewsCount: 118, 
    image: '/images/Berserking-Menace-7.webp'
  },
  { 
    id: '13', 
    name: 'Monkey D. Luffy Gear 5 Tee', 
    price: 1099, 
    originalPrice: 1699, 
    badge: 'BEST SELLER', 
    graphicColor: '#D4FF00', 
    category: 'Anime', 
    sizes: ['M', 'L', 'XL', '2XL'], 
    rating: 4.9, 
    reviewsCount: 210, 
    image: '/images/fsguc_512.webp'
  },
  { 
    id: '14', 
    name: 'Goku Ultra Instinct Dragon Tee', 
    price: 1199, 
    originalPrice: 1799, 
    badge: 'HOT DROP', 
    graphicColor: '#F3F4F6', 
    category: 'Anime', 
    sizes: ['S', 'M', 'L', 'XL'], 
    rating: 5.0, 
    reviewsCount: 147, 
    image: '/images/IMG_5779WEB-min.webp'
  }
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState('best-selling');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = ['All', 'Graphic', 'Anime', 'Minimalist'];
  const sizes = ['All', 'S', 'M', 'L', 'XL', '2XL'];
  const colors = [
    { label: 'All', hex: '' },
    { label: 'Volt', hex: '#D4FF00' },
    { label: 'Red', hex: '#FF2E23' },
    { label: 'Pink', hex: '#FFB7C5' },
    { label: 'Neon Green', hex: '#39FF14' },
    { label: 'Cobalt', hex: '#3B82F6' },
    { label: 'Sand', hex: '#E5D3B3' },
    { label: 'Black', hex: '#0D0D0D' }
  ];

  // Filtering & sorting logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSize = selectedSize === 'All' || product.sizes.includes(selectedSize);
      const matchesColor = selectedColor === 'All' || product.graphicColor === colors.find(c => c.label === selectedColor)?.hex;
      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'newest') return b.id.localeCompare(a.id); // mock newer based on ID string
      return b.reviewsCount - a.reviewsCount; // default 'best-selling' based on review totals
    });
  }, [searchQuery, selectedCategory, selectedSize, selectedColor, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setMaxPrice(2000);
    setSearchQuery('');
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-8">
      {/* Category */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-white">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left text-xs uppercase tracking-wider font-semibold transition-colors py-1 ${
                selectedCategory === cat ? 'text-accent font-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-white">Filter by Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map(sz => (
            <button 
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`px-3 py-2 text-[10px] font-black rounded border transition-colors ${
                selectedSize === sz 
                  ? 'bg-accent text-black border-accent' 
                  : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:border-neutral-800'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-white">Filter by Graphic Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map(col => (
            <button 
              key={col.label}
              onClick={() => setSelectedColor(col.label)}
              className={`relative h-8 rounded border flex items-center justify-center text-[8px] font-bold uppercase transition-all ${
                selectedColor === col.label 
                  ? 'border-accent scale-105' 
                  : 'border-neutral-900 bg-neutral-950 text-neutral-400 hover:border-neutral-800'
              }`}
              style={{ backgroundColor: col.hex || 'transparent' }}
              title={col.label}
            >
              {col.label === 'All' ? 'ALL' : (
                selectedColor === col.label && (
                  <CheckIcon className={`w-3.5 h-3.5 ${col.hex === '#F3F4F6' || col.hex === '#D4FF00' || col.hex === '#39FF14' ? 'text-black' : 'text-white'}`} />
                )
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-baseline">
          <h3 className="text-xs font-black uppercase tracking-widest text-white">Max Price</h3>
          <span className="text-xs font-black text-accent tracking-tighter">Rs. {maxPrice}</span>
        </div>
        <input 
          type="range" 
          min="800" 
          max="2000" 
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
          className="w-full accent-accent bg-neutral-900 rounded"
        />
      </div>

      {/* Reset */}
      <button 
        onClick={handleResetFilters}
        className="w-full py-3 bg-neutral-950 border border-neutral-900 hover:border-red-500/40 text-neutral-400 hover:text-red-500 font-extrabold uppercase text-[10px] tracking-widest transition-colors rounded-sm"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col gap-8 mt-6">
        
        {/* Top Header Section */}
        <div className="flex flex-col gap-4">
          <span className="text-accent text-xs font-black uppercase tracking-widest">STREETWEAR CATALOG</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Shop Oversized Tees</h1>
          <p className="text-neutral-400 text-xs md:text-sm uppercase tracking-wider max-w-xl">Heavyweight 240 GSM drop-shoulders constructed for longevity. Scroll our collections or filter by size, category, and graphics.</p>
        </div>

        {/* Toolbar (Search, sorting, mobile filter toggle) */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-y border-neutral-900 py-4 gap-4 bg-neutral-950 px-4 rounded-sm">
          {/* Search */}
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:max-w-xs bg-black border border-neutral-900 px-4 py-2.5 rounded text-xs text-white uppercase font-semibold tracking-wider placeholder:text-neutral-600 focus:outline-none focus:border-accent"
          />

          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            {/* Sort */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black border border-neutral-900 px-3 py-2.5 rounded text-xs text-white font-bold uppercase tracking-wider focus:outline-none focus:border-accent"
            >
              <option value="best-selling">Best Selling</option>
              <option value="newest">New Arrivals</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>

            {/* Mobile filter button */}
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 bg-accent text-black font-extrabold text-xs uppercase tracking-widest px-4 py-2.5 rounded"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Main catalog block */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          
          {/* Desktop Sidebar (md:col-span-1) */}
          <aside className="hidden md:block md:col-span-1 border border-neutral-900 bg-card-bg p-6 rounded-lg shadow-sm">
            <SidebarContent />
          </aside>

          {/* Grid Products list (md:col-span-3) */}
          <main className="md:col-span-3 flex flex-col gap-8">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="border border-neutral-900 rounded-lg p-16 text-center text-neutral-500 uppercase tracking-widest font-black text-sm">
                No items match your filters.
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Drawer Filters modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/80" 
          />
          {/* Sidebar Drawer */}
          <div className="relative w-4/5 max-w-sm bg-card-bg border-l border-neutral-900 ml-auto h-full flex flex-col p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8 border-b border-neutral-900 pb-4">
              <span className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </span>
              <button 
                onClick={() => setIsMobileFiltersOpen(false)} 
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Mini check icon
function CheckIcon(props) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
