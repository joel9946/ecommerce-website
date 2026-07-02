'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '@/store/cartStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop T-Shirts', href: '/shop' },
    { label: 'Custom Print', href: '/custom' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Announcement Bar Marquee */}
      <div className="bg-accent text-black text-xs uppercase py-2 overflow-hidden font-extrabold tracking-widest select-none border-b border-black">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="mx-8">FREE SHIPPING ON ORDERS ABOVE RS.999 ⚡</span>
          <span className="mx-8">DESIGN YOUR OWN OVERSIZED T-SHIRT 🎨</span>
          <span className="mx-8">PREMIUM 240 GSM HEAVYWEIGHT COTTON 👕</span>
          <span className="mx-8">CASH ON DELIVERY AVAILABLE ALL INDIA 🇮🇳</span>
          {/* Duplicate for infinite seamless loop */}
          <span className="mx-8">FREE SHIPPING ON ORDERS ABOVE RS.999 ⚡</span>
          <span className="mx-8">DESIGN YOUR OWN OVERSIZED T-SHIRT 🎨</span>
          <span className="mx-8">PREMIUM 240 GSM HEAVYWEIGHT COTTON 👕</span>
          <span className="mx-8">CASH ON DELIVERY AVAILABLE ALL INDIA 🇮🇳</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-[#0D0D0D]/95 backdrop-blur-md border-b border-neutral-800 px-6 py-4 md:px-12 flex items-center justify-between transition-all duration-300">
        {/* Left: Brand Logo */}
        <Link href="/" className="group flex items-center gap-1">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-xl md:text-2xl font-black tracking-tighter text-white"
          >
            CUSTOMPRINT<span className="text-accent">.</span>
          </motion.span>
        </Link>

        {/* Center: Desktop Navigation links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="relative text-sm font-semibold text-neutral-400 hover:text-white uppercase tracking-wider transition-colors py-1 group"
            >
              {link.label}
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right: Icons (Desktop) */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-neutral-400 hover:text-white transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/auth" className="text-neutral-400 hover:text-white transition-colors" aria-label="Account">
            <User className="w-5 h-5" />
          </Link>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer" 
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button 
            className="md:hidden text-neutral-400 hover:text-white transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
            />
            {/* Sidebar drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#0D0D0D] border-l border-neutral-800 z-50 p-8 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <span className="text-lg font-black text-white">
                    MENU<span className="text-accent">.</span>
                  </span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xl font-bold uppercase tracking-widest text-neutral-300 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-6">
                <Link 
                  href="/auth" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-neutral-400 hover:text-white mb-4"
                >
                  <User className="w-5 h-5" /> Account Details
                </Link>
                <div className="text-neutral-500 text-xs">
                  © 2026 CustomPrint. All rights reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
