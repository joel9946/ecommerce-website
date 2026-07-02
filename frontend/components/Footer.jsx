'use client';

import Link from 'next/link';
import { Send, ArrowUpRight } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const shopLinks = [
    { label: 'Oversized T-Shirts', href: '/shop' },
    { label: 'Anime Graphic Shirts', href: '/shop?cat=anime' },
    { label: 'Minimalist Streetwear', href: '/shop?cat=minimal' },
    { label: 'Custom Print Canvas', href: '/custom' },
  ];

  const infoLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Support', href: '/contact' },
    { label: 'Track Order', href: '/account/orders' },
    { label: 'FAQs & Returns', href: '/contact#faq' },
  ];

  return (
    <footer className="bg-[#090909] border-t border-neutral-900 text-neutral-400 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-2xl font-black text-white tracking-tighter">
            CUSTOMPRINT<span className="text-accent">.</span>
          </Link>
          <p className="text-sm text-neutral-500 max-w-xs">
            Premium 240 GSM drop-shoulder oversized tees. Custom printed with high-density inks in India.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-accent transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs uppercase tracking-wider text-neutral-400 hover:text-accent font-bold flex items-center gap-1 transition-colors"
            >
              WhatsApp Support <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Collection Links */}
        <div>
          <h3 className="text-white font-extrabold uppercase tracking-widest text-xs mb-6">Collections</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info Links */}
        <div>
          <h3 className="text-white font-extrabold uppercase tracking-widest text-xs mb-6">Information</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {infoLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter subscription */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-extrabold uppercase tracking-widest text-xs mb-2">Newsletter</h3>
          <p className="text-sm text-neutral-500">
            Subscribe for 10% off your first custom print order.
          </p>
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="flex items-center border border-neutral-800 rounded bg-black overflow-hidden group focus-within:border-accent transition-colors"
          >
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              required
              className="bg-transparent border-none text-white text-xs px-4 py-3.5 focus:outline-none flex-grow placeholder:text-neutral-600 font-semibold uppercase tracking-wider"
            />
            <button 
              type="submit" 
              className="bg-neutral-900 text-white hover:bg-accent hover:text-black transition-colors px-4 py-3.5"
              aria-label="Subscribe"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-7xl mx-auto border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
        <div>
          © 2026 CustomPrint. Made in India.
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-neutral-400 transition-colors">Terms of Service</Link>
          <Link href="/shipping" className="hover:text-neutral-400 transition-colors">Shipping & Refund Policies</Link>
        </div>
      </div>
    </footer>
  );
}
