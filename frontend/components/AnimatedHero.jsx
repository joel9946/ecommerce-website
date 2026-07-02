'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const HeroShirtSVG = () => (
  <svg viewBox="0 0 400 450" className="w-full max-w-[420px] h-auto fill-neutral-950 stroke-neutral-800" strokeWidth="2.5">
    {/* Body profile */}
    <path d="M 90,60 C 95,95 105,100 130,95 L 155,90 C 160,88 175,85 200,85 C 225,85 240,88 245,90 L 270,95 C 295,100 305,95 310,60 L 375,115 L 340,195 L 305,185 L 308,410 L 92,410 L 95,185 L 60,195 L 25,115 Z" />
    {/* Collar detail */}
    <path d="M 155,90 C 165,108 235,108 245,90" fill="none" stroke="#262626" strokeWidth="4" />
    {/* Large center graphic */}
    <g transform="translate(115, 140) scale(0.85)">
      {/* Gothic style logo / badge shape */}
      <polygon points="100,10 170,50 170,130 100,170 30,130 30,50" fill="#0c0c0c" stroke="#D4FF00" strokeWidth="4" />
      <text x="100" y="85" fill="#FFFFFF" fontSize="36" fontWeight="900" letterSpacing="2" textAnchor="middle">
        XX
      </text>
      <text x="100" y="115" fill="#D4FF00" fontSize="10" fontWeight="800" letterSpacing="6" textAnchor="middle">
        STREETWEAR
      </text>
      <line x1="60" y1="130" x2="140" y2="130" stroke="#262626" strokeWidth="2" />
    </g>
    {/* Bottom edge stitching details */}
    <line x1="92" y1="400" x2="308" y2="400" stroke="#262626" strokeDasharray="3,3" />
    <line x1="92" y1="404" x2="308" y2="404" stroke="#262626" strokeDasharray="3,3" />
  </svg>
);

export default function AnimatedHero() {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const ctaRef = useRef(null);
  const shirtRef = useRef(null);

  useEffect(() => {
    // 1. Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(textRef1.current, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(textRef2.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(ctaRef.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.5 },
      '-=0.2'
    )
    .fromTo(shirtRef.current, 
      { opacity: 0, scale: 0.8, rotate: -15 }, 
      { opacity: 1, scale: 1, rotate: -3, duration: 1 },
      '-=0.6'
    );

    // 2. Loop bobbing animation using a second timeline
    const bobTl = gsap.timeline({ repeat: -1 });
    bobTl.to(shirtRef.current, {
      y: -15,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // 3. Loop rotation animation
    const rotTl = gsap.timeline({ repeat: -1 });
    rotTl.to(shirtRef.current, {
      rotate: 3,
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    return () => {
      tl.kill();
      bobTl.kill();
      rotTl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center bg-[#0D0D0D] overflow-hidden px-6 py-16 md:px-12"
    >
      {/* Background glow points (mesh gradient representation) */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-red-600/5 blur-[140px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left: Text copy */}
        <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <div className="inline-flex items-center gap-2 border border-neutral-800 bg-[#141414] rounded-full px-4 py-1.5 text-xs text-neutral-400 font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            NEW DROP IS NOW LIVE
          </div>
          
          <h1 
            ref={textRef1} 
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none"
          >
            Unleash Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-accent">
              Streetwear
            </span> <br />
            Identity
          </h1>
          
          <p 
            ref={textRef2} 
            className="text-neutral-400 text-sm md:text-lg max-w-md font-medium tracking-wide leading-relaxed"
          >
            Premium 240 GSM heavyweights designed to carry bold graphic cuts, or fully customized by you on our interactive print canvas.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
            <Link 
              href="/shop" 
              className="group relative inline-flex items-center justify-center gap-2 bg-accent text-black font-extrabold uppercase text-xs tracking-widest px-8 py-4 rounded-sm hover:bg-white transition-all duration-300 w-full sm:w-auto shadow-md"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link 
              href="/custom" 
              className="relative inline-flex items-center justify-center bg-transparent border border-neutral-800 text-white font-extrabold uppercase text-xs tracking-widest px-8 py-4 rounded-sm hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300 w-full sm:w-auto"
            >
              Design Your Own
            </Link>
          </div>
        </div>

        {/* Right: Floating graphic mockup */}
        <div className="flex items-center justify-center select-none">
          <div 
            ref={shirtRef} 
            className="relative flex items-center justify-center w-full max-w-[420px] aspect-square transition-transform duration-300 cursor-grab active:cursor-grabbing"
          >
            {/* Soft shadow underneath shirt */}
            <div className="absolute -bottom-8 w-3/4 h-6 bg-black/40 blur-xl rounded-full scale-y-50 pointer-events-none" />
            <HeroShirtSVG />
          </div>
        </div>

      </div>
    </section>
  );
}
