'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inline premium vector SVGs for Streetwear drop-shoulder t-shirt representation
const ShirtFrontSVG = ({ graphicColor = '#D4FF00' }) => (
  <svg viewBox="0 0 400 450" className="w-full h-full fill-neutral-900 stroke-neutral-800" strokeWidth="2">
    {/* Body structure */}
    <path d="M 90,60 C 95,95 105,100 130,95 L 155,90 C 160,88 175,85 200,85 C 225,85 240,88 245,90 L 270,95 C 295,100 305,95 310,60 L 375,115 L 340,195 L 305,185 L 308,410 L 92,410 L 95,185 L 60,195 L 25,115 Z" />
    {/* Collar seam */}
    <path d="M 155,90 C 165,108 235,108 245,90" fill="none" stroke="#262626" strokeWidth="3" />
    <path d="M 160,90 C 170,103 230,103 240,90" fill="none" stroke="#404040" strokeWidth="1" />
    {/* Sleeve seams */}
    <path d="M 95,185 L 115,110" fill="none" stroke="#262626" />
    <path d="M 305,185 L 285,110" fill="none" stroke="#262626" />
    {/* Streetwear Graphic (Chest print) */}
    <g transform="translate(145, 140) scale(0.7)">
      {/* Abstract skull / crossbones neon graphic */}
      <circle cx="80" cy="70" r="30" fill="#141414" stroke={graphicColor} strokeWidth="5" />
      <path d="M 55,120 L 105,120 M 60,110 L 100,110" stroke={graphicColor} strokeWidth="4" strokeLinecap="round" />
      <rect x="65" y="90" width="30" height="15" rx="3" fill="#141414" stroke={graphicColor} strokeWidth="4" />
      <path d="M 50,40 L 40,30 M 110,40 L 120,30 M 50,100 L 35,115 M 110,100 L 125,115" stroke={graphicColor} strokeWidth="6" strokeLinecap="round" />
      {/* Tiny streetwear text */}
      <text x="80" y="150" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="3" textAnchor="middle">
        TOKYO LIMIT
      </text>
    </g>
  </svg>
);

const ShirtBackSVG = ({ graphicColor = '#D4FF00' }) => (
  <svg viewBox="0 0 400 450" className="w-full h-full fill-neutral-900 stroke-neutral-800" strokeWidth="2">
    {/* Body structure */}
    <path d="M 90,60 C 95,95 105,100 130,95 L 155,90 C 160,88 175,85 200,85 C 225,85 240,88 245,90 L 270,95 C 295,100 305,95 310,60 L 375,115 L 340,195 L 305,185 L 308,410 L 92,410 L 95,185 L 60,195 L 25,115 Z" />
    {/* Collar back seam */}
    <path d="M 155,90 C 175,98 225,98 245,90" fill="none" stroke="#1c1c1c" strokeWidth="4" />
    {/* Sleeve seams */}
    <path d="M 95,185 L 115,110" fill="none" stroke="#262626" />
    <path d="M 305,185 L 285,110" fill="none" stroke="#262626" />
    {/* Giant Typography back graphic */}
    <g transform="translate(110, 120) scale(0.9)">
      <rect x="0" y="0" width="180" height="200" fill="none" stroke="#262626" strokeDasharray="5,5" />
      <text x="90" y="45" fill={graphicColor} fontSize="28" fontWeight="900" letterSpacing="4" textAnchor="middle">
        HAVVOK
      </text>
      <text x="90" y="80" fill="#FFFFFF" fontSize="16" fontWeight="800" letterSpacing="8" textAnchor="middle">
        PROJECT.01
      </text>
      <line x1="20" y1="100" x2="160" y2="100" stroke="#404040" strokeWidth="2" />
      <text x="90" y="130" fill="#737373" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">
        OVERSIZED HEAVYWEIGHT
      </text>
      <text x="90" y="150" fill="#737373" fontSize="10" fontWeight="700" letterSpacing="2" textAnchor="middle">
        240 GSM SINGLE JERSEY
      </text>
      <text x="90" y="180" fill={graphicColor} fontSize="14" fontWeight="900" letterSpacing="4" textAnchor="middle">
        2026 EDITION
      </text>
    </g>
  </svg>
);

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  // Hardcode product values if not provided
  const {
    id = '1',
    name = 'Heavyweight Gothic Graphic Tee',
    price = 999,
    originalPrice = 1499,
    badge = 'BEST SELLER',
    rating = 4.9,
    reviewsCount = 124,
    graphicColor = '#D4FF00'
  } = product || {};

  const sizes = ['S', 'M', 'L', 'XL', '2XL'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-card-bg border border-neutral-900 rounded-lg overflow-hidden transition-all duration-300 hover:border-neutral-800"
    >
      {/* Badge sticker overlay */}
      {badge && (
        <span className="absolute top-4 left-4 z-10 bg-accent text-black font-black uppercase text-[10px] tracking-widest px-2.5 py-1.5 rounded-sm select-none shadow">
          {badge}
        </span>
      )}

      {/* Image or SVG container block */}
      <Link href={`/shop/${id}`} className="relative block w-full bg-neutral-950 p-4 aspect-[4/5] overflow-hidden border-b border-neutral-900 cursor-pointer">
        {product.image ? (
          <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <img 
              src={product.image} 
              alt={name} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="front"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center"
              >
                <ShirtFrontSVG graphicColor={graphicColor} />
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center scale-105 transition-transform duration-700"
              >
                <ShirtBackSVG graphicColor={graphicColor} />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Quick Size Select Bar (slides up on hover) */}
        <motion.div 
          animate={{ y: isHovered ? 0 : 50, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute left-0 right-0 bottom-0 bg-black/90 backdrop-blur-sm p-3 flex items-center justify-between border-t border-neutral-900"
          onClick={(e) => e.preventDefault()} // prevent navigation
        >
          <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-widest">SIZE</span>
          <div className="flex gap-1.5">
            {sizes.map(size => (
              <button 
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-7 h-7 text-[10px] font-black rounded-sm border flex items-center justify-center transition-colors ${
                  selectedSize === size 
                    ? 'bg-accent text-black border-accent' 
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </motion.div>
      </Link>

      {/* Details block */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div className="flex flex-col gap-1">
          {/* Ratings */}
          <div className="flex items-center gap-1.5 text-neutral-500 text-[11px] font-bold">
            <div className="flex text-accent">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>{rating}</span>
            <span>({reviewsCount} REVIEWS)</span>
          </div>

          {/* Product Title */}
          <Link href={`/shop/${id}`}>
            <h3 className="text-white font-extrabold tracking-tight hover:text-accent transition-colors uppercase text-sm leading-tight mt-1 truncate">
              {name}
            </h3>
          </Link>
        </div>

        {/* Price & Cart Trigger */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-white text-base font-black tracking-tight">Rs. {price}</span>
            {originalPrice && (
              <span className="text-neutral-600 text-xs font-bold line-through">Rs. {originalPrice}</span>
            )}
          </div>

          {/* Mini Quick Add Button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 shadow"
            aria-label="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
