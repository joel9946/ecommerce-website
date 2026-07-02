'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import AnimatedHero from '@/components/AnimatedHero';
import ProductCard from '@/components/ProductCard';
import { motion, useInView } from 'framer-motion';
import { Sparkles, HelpCircle, Palette, Layers, Truck } from 'lucide-react';

// Count-up helper component for about stats
function CountUp({ end, suffix = '', duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const endVal = parseInt(end, 10);
    if (start === endVal) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / endVal), 20);
    
    const timer = setInterval(() => {
      start += Math.ceil(endVal / 50); // count up in steps
      if (start >= endVal) {
        clearInterval(timer);
        setCount(endVal);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const trendingProducts = [
    { 
      id: '1', 
      name: 'Zenitsu Lightning Drop-Shoulder Tee', 
      price: 1099, 
      originalPrice: 1599, 
      badge: 'BEST SELLER', 
      graphicColor: '#D4FF00', 
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
      rating: 4.8, 
      reviewsCount: 88,
      image: '/images/zoom_0-1739428581.avif'
    },
    { 
      id: '13', 
      name: 'Monkey D. Luffy Gear 5 Tee', 
      price: 1099, 
      originalPrice: 1699, 
      badge: 'BEST SELLER', 
      graphicColor: '#D4FF00', 
      rating: 4.9, 
      reviewsCount: 210,
      image: '/images/fsguc_512.webp'
    },
    { 
      id: '6', 
      name: 'Cybernetic Exoskeleton Spine Tee', 
      price: 1199, 
      originalPrice: 1799, 
      badge: 'FUTURE', 
      graphicColor: '#3B82F6', 
      rating: 4.8, 
      reviewsCount: 57,
      image: '/images/edit-kj-v-7.webp'
    },
  ];

  const faqItems = [
    { q: "What is the fabric quality?", a: "We use premium 240 GSM 100% combed cotton. It is heavyweight, breathable, pre-shrunk, and holds custom print graphics perfectly without fading." },
    { q: "Is there a minimum order limit for custom prints?", a: "No! You can order a single custom-printed T-shirt. We print details piece-by-piece using advanced Direct-to-Garment (DTG) print nozzles." },
    { q: "How long does shipping take?", a: "Orders are processed within 24-48 hours. Delivery takes 3-5 business days across major cities in India, with free express shipping above Rs. 999." },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-[#0D0D0D] text-white flex flex-col w-full">
      {/* 1. Animated Hero */}
      <AnimatedHero />

      {/* 2. Scrolling Ticker Ribbon */}
      <div className="-rotate-1 bg-accent text-black uppercase font-black py-4 border-y border-black overflow-hidden shadow-2xl relative z-10 my-4 select-none">
        <div className="flex animate-marquee-slow whitespace-nowrap text-xs md:text-sm tracking-widest font-black">
          <span className="mx-12 flex items-center gap-2">FREE SHIPPING ABOVE RS.999 <Truck className="w-4 h-4" /></span>
          <span className="mx-12 flex items-center gap-2">CUSTOM ARTWORK PRINTING <Palette className="w-4 h-4" /></span>
          <span className="mx-12 flex items-center gap-2">HEAVYWEIGHT 240 GSM COTTON <Layers className="w-4 h-4" /></span>
          <span className="mx-12 flex items-center gap-2">CASH ON DELIVERY AVAILABLE 🇮🇳</span>
          {/* Loop repeat */}
          <span className="mx-12 flex items-center gap-2">FREE SHIPPING ABOVE RS.999 <Truck className="w-4 h-4" /></span>
          <span className="mx-12 flex items-center gap-2">CUSTOM ARTWORK PRINTING <Palette className="w-4 h-4" /></span>
          <span className="mx-12 flex items-center gap-2">HEAVYWEIGHT 240 GSM COTTON <Layers className="w-4 h-4" /></span>
          <span className="mx-12 flex items-center gap-2">CASH ON DELIVERY AVAILABLE 🇮🇳</span>
        </div>
      </div>

      {/* 3. Featured / Trending Products Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 text-center md:text-left gap-4">
          <div>
            <span className="text-accent text-xs font-black uppercase tracking-widest block mb-2">CURATED CLOTHING</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
              Trending Drop<span className="text-accent">.</span>
            </h2>
          </div>
          <Link href="/shop" className="text-sm font-extrabold uppercase tracking-wider text-neutral-400 hover:text-white border-b-2 border-neutral-800 hover:border-accent transition-colors pb-1">
            Browse All Collection
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Custom Print CTA Banner */}
      <section className="relative py-28 px-6 md:px-12 overflow-hidden border-y border-neutral-900 bg-neutral-950">
        <div className="absolute inset-0 bg-radial-gradient(at_center,rgba(212,255,0,0.03)_0%,transparent_70%) pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center text-accent bg-accent/5">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
            Design Your Own <br />
            <span className="text-accent">Streetwear Tee.</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-lg max-w-xl font-medium tracking-wide leading-relaxed">
            Upload your graphics, drawings, or logos, adjust the position in real time on our interactive canvas, and order. We print on demand with no minimum quantity.
          </p>
          <Link 
            href="/custom" 
            className="mt-4 inline-flex bg-white text-black font-extrabold uppercase text-xs tracking-widest px-10 py-5 rounded-sm hover:bg-accent hover:text-black transition-all duration-300 shadow-lg"
          >
            Launch Design Canvas
          </Link>
        </div>
      </section>

      {/* 5. About Stats Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col gap-2 p-8 border border-neutral-900 rounded bg-card-bg">
            <span className="text-accent text-5xl font-black">
              <CountUp end={500} suffix="+" />
            </span>
            <span className="text-white font-extrabold uppercase text-xs tracking-widest mt-1">Unique Artworks</span>
            <span className="text-neutral-500 text-xs mt-1">Prepared by top visual graphic creators</span>
          </div>
          
          <div className="flex flex-col gap-2 p-8 border border-neutral-900 rounded bg-card-bg">
            <span className="text-accent text-5xl font-black">
              <CountUp end={10000} suffix="+" />
            </span>
            <span className="text-white font-extrabold uppercase text-xs tracking-widest mt-1">Happy Customers</span>
            <span className="text-neutral-500 text-xs mt-1">Raving streetwear reviews across India</span>
          </div>

          <div className="flex flex-col gap-2 p-8 border border-neutral-900 rounded bg-card-bg">
            <span className="text-accent text-5xl font-black">
              <CountUp end={240} suffix=" GSM" />
            </span>
            <span className="text-white font-extrabold uppercase text-xs tracking-widest mt-1">Heavyweight Fabric</span>
            <span className="text-neutral-500 text-xs mt-1">Superior thickness, structure and feel</span>
          </div>
        </div>
      </section>

      {/* 6. Instagram UGC Lookbook Grid */}
      <section className="py-16 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
          <span className="text-accent text-xs font-black uppercase tracking-widest block mb-2">WEAR YOUR IDENTITY</span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase mb-12">
            Spotted In CustomPrint<span className="text-accent">.</span>
          </h2>
          
          {/* Stylized grid representation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="relative aspect-square bg-[#0D0D0D] border border-neutral-900 rounded-md overflow-hidden group"
              >
                {/* SVG mock streetwear photo representation */}
                <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-tr from-neutral-950 to-neutral-900 group-hover:scale-105 transition-transform duration-500">
                  <svg viewBox="0 0 100 100" className="w-12 h-12 fill-neutral-800">
                    <path d="M50 15c-11 0-20 9-20 20v25h40V35c0-11-9-20-20-20zm0 8c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 p-4">
                  <p className="text-white font-bold uppercase text-[10px] tracking-wider">@streetwear_vibe_{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Accordion FAQs */}
      <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <HelpCircle className="w-8 h-8 mx-auto text-accent mb-4" />
          <h2 className="text-3xl font-black uppercase tracking-tight">Got Questions?</h2>
          <p className="text-neutral-500 text-xs mt-2 uppercase tracking-widest">Learn more about our customized order process</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqItems.map((item, idx) => (
            <div 
              key={idx} 
              className="border border-neutral-900 rounded bg-card-bg overflow-hidden"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base uppercase tracking-tight text-white focus:outline-none"
              >
                <span>{item.q}</span>
                <span className="text-accent text-xl">{openFaq === idx ? '−' : '+'}</span>
              </button>
              
              <motion.div 
                initial={false}
                animate={{ height: openFaq === idx ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-5 pt-0 text-sm text-neutral-400 leading-relaxed border-t border-neutral-900">
                  {item.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
