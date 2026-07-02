'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Award, ShieldCheck, Sparkles, Flame, Check } from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Flame className="w-6 h-6 text-accent" />,
      title: "Raw Streetwear Culture",
      description: "We are built on rebellion, heavy typography, and deep subculture references. Our garments are statements of identity, not just fabric."
    },
    {
      icon: <Palette className="w-6 h-6 text-accent" />,
      title: "Advanced DTG Printing",
      description: "Equipped with industry-leading Direct-to-Garment printers. We preserve high-frequency color ranges, gradients, and micro-details on combed cotton."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      title: "Heavyweight 240 GSM",
      description: "Standard tees wear down; ours hold form. Crafted using dense 100% cotton combed single-jersey loops for that premium boxy hang."
    }
  ];

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col gap-16 mt-6">
        
        {/* Hero Section */}
        <section className="text-center flex flex-col items-center gap-6 relative py-12">
          {/* Subtle glowing radial background */}
          <div className="absolute inset-0 bg-radial-gradient(at_center,rgba(212,255,0,0.02)_0%,transparent_60%) pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-accent/20 bg-accent/5 rounded-full text-accent text-[10px] font-black uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" /> ESTABLISHED 2026
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none max-w-4xl"
          >
            The Streets Are Our <span className="text-accent">Canvas.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-xs md:text-base font-semibold tracking-wider max-w-2xl leading-relaxed uppercase"
          >
            CustomPrint. was founded as an antidote to fast fashion. We merge premium heavyweight apparel blanks with an interactive web design canvas to let you build your identity piece-by-piece.
          </motion.p>
        </section>

        {/* Core Pillars / Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card-bg border border-neutral-900 rounded-lg p-8 flex flex-col gap-4 hover:border-neutral-800 transition-colors"
            >
              <div className="w-12 h-12 rounded bg-neutral-950 border border-neutral-900 flex items-center justify-center shrink-0">
                {value.icon}
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-white mt-2">{value.title}</h3>
              <p className="text-neutral-500 text-xs font-semibold leading-relaxed tracking-wider">{value.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Narrative / Split Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
          {/* Visual column */}
          <div className="lg:col-span-6 relative aspect-video bg-neutral-950 border border-neutral-900 rounded-lg overflow-hidden flex items-center justify-center p-8 select-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />
            <div className="text-center z-10 flex flex-col gap-3">
              <span className="text-accent text-5xl font-black">240 GSM</span>
              <span className="text-white font-extrabold uppercase text-xs tracking-widest">Heavy Combed Cotton</span>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-accent text-xs font-black uppercase tracking-widest">OUR CRAFT</span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none text-white">We make garments that hold structure.</h2>
            <p className="text-neutral-400 text-xs leading-relaxed tracking-wider font-semibold uppercase">
              Every single product we ship starts as raw combed long-staple cotton yarn. We bio-wash and pre-shrink our fabrics, resulting in a T-shirt that hangs properly, breathes well, and doesn't lose its shape after a run in the dryer.
            </p>
            
            <ul className="flex flex-col gap-3 text-xs font-black uppercase tracking-widest text-neutral-300">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                Zero minimum quantity order bounds
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                Double-needle shoulder & collar rib lock-seam stitches
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                Express delivery & live tracking across all major cities
              </li>
            </ul>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-neutral-950 border border-neutral-900 rounded-lg p-12 text-center flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient(at_center,rgba(212,255,0,0.03)_0%,transparent_70%) pointer-events-none" />
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">Ready to express yourself?</h2>
          <p className="text-neutral-400 text-xs md:text-sm font-semibold max-w-lg leading-relaxed uppercase tracking-wider">
            Explore our curated drops or load our custom designer canvas editor to construct your own custom heavyweight streetwear.
          </p>
          <div className="flex gap-4 mt-2">
            <Link 
              href="/shop" 
              className="bg-white text-black font-extrabold uppercase text-[10px] tracking-widest px-8 py-4.5 rounded-sm hover:bg-accent hover:text-black transition-all shadow"
            >
              Shop Curated Drop
            </Link>
            <Link 
              href="/custom" 
              className="bg-neutral-900 border border-neutral-800 text-white font-extrabold uppercase text-[10px] tracking-widest px-8 py-4.5 rounded-sm hover:border-accent hover:text-accent transition-all shadow"
            >
              Canvas Designer
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
