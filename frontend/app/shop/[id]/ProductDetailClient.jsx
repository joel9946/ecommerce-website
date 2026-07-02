'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, HelpCircle, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import useCartStore from '@/store/cartStore';
import { ALL_PRODUCTS } from '@/lib/products';

const PRODUCTS = ALL_PRODUCTS.map(p => ({
  ...p,
  image: p.image ? `/ecommerce-website${p.image}` : p.image
}));

// Vector SVG shirt renderers
const ShirtFrontSVG = ({ graphicColor }) => (
  <svg viewBox="0 0 400 450" className="w-full h-full fill-neutral-900 stroke-neutral-800" strokeWidth="2.5">
    <path d="M 90,60 C 95,95 105,100 130,95 L 155,90 C 160,88 175,85 200,85 C 225,85 240,88 245,90 L 270,95 C 295,100 305,95 310,60 L 375,115 L 340,195 L 305,185 L 308,410 L 92,410 L 95,185 L 60,195 L 25,115 Z" />
    <path d="M 155,90 C 165,108 235,108 245,90" fill="none" stroke="#262626" strokeWidth="4" />
    <g transform="translate(135, 130) scale(0.8)">
      <circle cx="80" cy="70" r="30" fill="#141414" stroke={graphicColor} strokeWidth="5" />
      <path d="M 55,120 L 105,120 M 60,110 L 100,110" stroke={graphicColor} strokeWidth="4" strokeLinecap="round" />
      <rect x="65" y="90" width="30" height="15" rx="3" fill="#141414" stroke={graphicColor} strokeWidth="4" />
      <path d="M 50,40 L 40,30 M 110,40 L 120,30 M 50,100 L 35,115 M 110,100 L 125,115" stroke={graphicColor} strokeWidth="6" strokeLinecap="round" />
      <text x="80" y="150" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="3" textAnchor="middle">TOKYO LIMIT</text>
    </g>
  </svg>
);

const ShirtBackSVG = ({ graphicColor }) => (
  <svg viewBox="0 0 400 450" className="w-full h-full fill-neutral-900 stroke-neutral-800" strokeWidth="2.5">
    <path d="M 90,60 C 95,95 105,100 130,95 L 155,90 C 160,88 175,85 200,85 C 225,85 240,88 245,90 L 270,95 C 295,100 305,95 310,60 L 375,115 L 340,195 L 305,185 L 308,410 L 92,410 L 95,185 L 60,195 L 25,115 Z" />
    <path d="M 155,90 C 175,98 225,98 245,90" fill="none" stroke="#1c1c1c" strokeWidth="4" />
    <g transform="translate(100, 110) scale(1.0)">
      <rect x="0" y="0" width="180" height="200" fill="none" stroke="#262626" strokeDasharray="5,5" />
      <text x="90" y="45" fill={graphicColor} fontSize="28" fontWeight="900" letterSpacing="4" textAnchor="middle">HAVVOK</text>
      <text x="90" y="80" fill="#FFFFFF" fontSize="16" fontWeight="800" letterSpacing="8" textAnchor="middle">PROJECT.01</text>
      <line x1="20" y1="100" x2="160" y2="100" stroke="#404040" strokeWidth="2" />
      <text x="90" y="130" fill="#737373" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">OVERSIZED HEAVYWEIGHT</text>
      <text x="90" y="150" fill="#737373" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">240 GSM SINGLE JERSEY</text>
    </g>
  </svg>
);

export default function ProductDetailPage({ params }) {
  const unwrappedParams = React.use ? React.use(params) : params;
  const id = unwrappedParams.id;

  const addToCart = useCartStore((state) => state.addToCart);

  // Match URL parameter ID to product array or fallback to first product
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const [currentSide, setCurrentSide] = useState('front'); // 'front' | 'back'
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('description');

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: 'Pitch Black',
      image: product.image,
      custom: false
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-[90vh] py-12 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col gap-6 mt-6">
        
        {/* Back Link */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-500 hover:text-white transition-colors self-start">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
          
          {/* Left Column: Image / Mockup display (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-center gap-6">
            <div className="relative w-full aspect-[4/5] bg-neutral-950 border border-neutral-900 rounded-lg overflow-hidden flex items-center justify-center p-6 select-none">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-accent text-black font-black uppercase text-[10px] tracking-widest px-2.5 py-1.5 rounded-sm shadow">
                  {product.badge}
                </span>
              )}
              
              <div className="w-full h-full flex items-center justify-center">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain" 
                  />
                ) : (
                  currentSide === 'front' ? (
                    <ShirtFrontSVG graphicColor={product.graphicColor} />
                  ) : (
                    <ShirtBackSVG graphicColor={product.graphicColor} />
                  )
                )}
              </div>
            </div>

            {/* Toggle buttons for views */}
            {!product.image && (
              <div className="flex gap-4 border border-neutral-900 bg-neutral-950 p-1.5 rounded-sm">
                <button 
                  onClick={() => setCurrentSide('front')}
                  className={`px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-sm transition-all duration-300 ${
                    currentSide === 'front' ? 'bg-accent text-black font-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Front View
                </button>
                <button 
                  onClick={() => setCurrentSide('back')}
                  className={`px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-sm transition-all duration-300 ${
                    currentSide === 'back' ? 'bg-accent text-black font-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Back View
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Purchasing Controls (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-accent text-xs font-black uppercase tracking-widest block mb-2">{product.category} Collection</span>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-bold mt-3">
                <div className="flex text-accent">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-white font-black">{product.rating}</span>
                <span>({product.reviewsCount} CUSTOMER REVIEWS)</span>
              </div>
            </div>

            {/* Price node */}
            <div className="flex items-baseline gap-3 border-y border-neutral-900 py-4">
              <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">Rs. {product.price}</span>
              {product.originalPrice && (
                <span className="text-neutral-600 text-sm font-bold line-through">Rs. {product.originalPrice}</span>
              )}
              <span className="text-[10px] text-accent font-black border border-accent/20 bg-accent/5 px-2 py-0.5 rounded-sm uppercase tracking-widest ml-2">SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
            </div>

            {/* Size selector */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-neutral-400">
                <span>Select Size</span>
                <button className="text-[10px] text-accent hover:underline lowercase tracking-wider">Size Guide</button>
              </div>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', '2XL'].map(sz => {
                  const isAvailable = product.sizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-12 h-12 text-xs font-black rounded border flex items-center justify-center transition-all ${
                        !isAvailable 
                          ? 'bg-neutral-950 text-neutral-800 border-neutral-950 cursor-not-allowed opacity-30 line-through'
                          : selectedSize === sz
                            ? 'bg-accent text-black border-accent font-black'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:border-neutral-700'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Quantity</span>
                <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded overflow-hidden h-12 w-28">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
                  >
                    −
                  </button>
                  <span className="flex-grow text-center text-xs font-black tabular-nums">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-grow flex flex-col gap-2 justify-end h-12 mt-6">
                <button 
                  onClick={handleAddToCart}
                  className="w-full h-full flex items-center justify-center gap-2.5 bg-accent text-black font-extrabold uppercase text-xs tracking-widest py-3 rounded-sm hover:bg-white transition-all duration-300 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
              
              <button className="h-12 w-12 border border-neutral-900 bg-neutral-950 text-neutral-500 hover:text-red-500 hover:border-neutral-800 rounded flex items-center justify-center mt-6 transition-colors" aria-label="Favorite">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 bg-neutral-950 border border-neutral-900 p-4 rounded mt-4">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className="uppercase tracking-wider">100% Secure Payments  |  Easy Returns  |  Made in India</span>
            </div>

            {/* Accordions */}
            <div className="flex flex-col gap-3 mt-6 border-t border-neutral-900 pt-6">
              {[
                { id: 'description', label: 'Description', content: product.description },
                { id: 'specifications', label: 'Specifications', content: '240 GSM heavyweight single jersey fabric. 100% combed cotton fibers. Pre-shrunk, bio-washed, and softened. Breathable high density ink graphics. Standard D2C streetwear oversized loose fit.' },
                { id: 'shipping', label: 'Shipping & Returns', content: 'Ships in 1-2 days. Standard deliveries take 3-5 business days across India. COD orders accepted. Free returns or replacement exchanges within 7 days of delivery.' }
              ].map(tab => (
                <div key={tab.id} className="border border-neutral-900 rounded bg-card-bg overflow-hidden">
                  <button 
                    onClick={() => setOpenAccordion(openAccordion === tab.id ? null : tab.id)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs uppercase tracking-widest text-white focus:outline-none"
                  >
                    <span>{tab.label}</span>
                    <span className="text-accent text-base">{openAccordion === tab.id ? '−' : '+'}</span>
                  </button>
                  {openAccordion === tab.id && (
                    <div className="p-4 pt-0 text-xs text-neutral-400 leading-relaxed border-t border-neutral-900">
                      {tab.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

