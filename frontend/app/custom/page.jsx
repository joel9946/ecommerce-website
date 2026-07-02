'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, RotateCw, Maximize2, ShoppingBag, Check, Layers, Trash2 } from 'lucide-react';
import useCartStore from '@/store/cartStore';

// Streetwear Drop-shoulder T-Shirt SVGs
const ShirtFrontSVG = ({ colorHex }) => (
  <svg viewBox="0 0 400 450" className="w-full h-full stroke-neutral-800 transition-colors duration-500" strokeWidth="2">
    <path 
      d="M 90,60 C 95,95 105,100 130,95 L 155,90 C 160,88 175,85 200,85 C 225,85 240,88 245,90 L 270,95 C 295,100 305,95 310,60 L 375,115 L 340,195 L 305,185 L 308,410 L 92,410 L 95,185 L 60,195 L 25,115 Z" 
      style={{ fill: colorHex }}
    />
    <path d="M 155,90 C 165,108 235,108 245,90" fill="none" stroke="#262626" strokeWidth="3" />
    <path d="M 160,90 C 170,103 230,103 240,90" fill="none" stroke="#404040" strokeWidth="1" />
    <path d="M 95,185 L 115,110" fill="none" stroke="#262626" strokeOpacity="0.5" />
    <path d="M 305,185 L 285,110" fill="none" stroke="#262626" strokeOpacity="0.5" />
  </svg>
);

const ShirtBackSVG = ({ colorHex }) => (
  <svg viewBox="0 0 400 450" className="w-full h-full stroke-neutral-800 transition-colors duration-500" strokeWidth="2">
    <path 
      d="M 90,60 C 95,95 105,100 130,95 L 155,90 C 160,88 175,85 200,85 C 225,85 240,88 245,90 L 270,95 C 295,100 305,95 310,60 L 375,115 L 340,195 L 305,185 L 308,410 L 92,410 L 95,185 L 60,195 L 25,115 Z" 
      style={{ fill: colorHex }}
    />
    <path d="M 155,90 C 175,98 225,98 245,90" fill="none" stroke="#1c1c1c" strokeWidth="4" />
    <path d="M 95,185 L 115,110" fill="none" stroke="#262626" strokeOpacity="0.5" />
    <path d="M 305,185 L 285,110" fill="none" stroke="#262626" strokeOpacity="0.5" />
  </svg>
);

export default function CustomPrintPage() {
  const addToCart = useCartStore((state) => state.addToCart);

  // Styling palette swatches
  const colors = [
    { name: 'Pitch Black', hex: '#0D0D0D' },
    { name: 'Pure White', hex: '#F3F4F6' },
    { name: 'Sand Cream', hex: '#E5D3B3' },
    { name: 'Forest Green', hex: '#1B4332' },
    { name: 'Slate Blue', hex: '#3B82F6' },
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [currentSide, setCurrentSide] = useState('front'); // 'front' | 'back'
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  // Front layout states
  const [frontImage, setFrontImage] = useState(null);
  const [frontScale, setFrontScale] = useState(1.0);
  const [frontRotate, setFrontRotate] = useState(0);

  // Back layout states
  const [backImage, setBackImage] = useState(null);
  const [backScale, setBackScale] = useState(1.0);
  const [backRotate, setBackRotate] = useState(0);

  const printZoneRef = useRef(null);
  const fileInputRef = useRef(null);

  // Toggles and getters
  const activeImage = currentSide === 'front' ? frontImage : backImage;
  const activeScale = currentSide === 'front' ? frontScale : backScale;
  const activeRotate = currentSide === 'front' ? frontRotate : backRotate;

  const setActiveScale = (val) => {
    if (currentSide === 'front') setFrontScale(val);
    else setBackScale(val);
  };

  const setActiveRotate = (val) => {
    if (currentSide === 'front') setFrontRotate(val);
    else setBackRotate(val);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit!");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (currentSide === 'front') {
          setFrontImage(event.target.result);
        } else {
          setBackImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    if (currentSide === 'front') {
      setFrontImage(null);
      setFrontScale(1.0);
      setFrontRotate(0);
    } else {
      setBackImage(null);
      setBackScale(1.0);
      setBackRotate(0);
    }
  };

  // Pricing calculator: Base 599 + 200 per side printed
  const basePrice = 599;
  const printSideCost = 200;
  const sidesPrinted = (frontImage ? 1 : 0) + (backImage ? 1 : 0);
  const unitPrice = basePrice + (sidesPrinted * printSideCost);
  const totalPrice = unitPrice * quantity;

  // Add custom shirt configuration to store
  const handleAddToCart = () => {
    if (!frontImage && !backImage) {
      alert("Please upload at least one design before adding to cart!");
      return;
    }

    const cartItem = {
      id: `custom-${Date.now()}`,
      name: `Custom Oversized Tee - ${selectedColor.name}`,
      price: unitPrice,
      quantity,
      size: selectedSize,
      color: selectedColor.name,
      frontDesign: frontImage,
      backDesign: backImage,
      custom: true
    };

    addToCart(cartItem);
    alert("Custom Print added to cart successfully!");
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-[90vh] py-12 px-6 md:px-12 flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
        
        {/* Left: Canvas Preview (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-center gap-6">
          <div className="w-full text-center lg:text-left">
            <span className="text-accent text-xs font-black uppercase tracking-widest block mb-2">DESIGN STUDIO</span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Custom Canvas Editor</h1>
            <p className="text-neutral-500 text-xs mt-1 uppercase tracking-wider">Drag and position your graphic directly inside the print bounds</p>
          </div>

          {/* Interactive Canvas container */}
          <div className="relative w-full max-w-[460px] aspect-[4/5] bg-neutral-950 border border-neutral-900 rounded-lg overflow-hidden flex items-center justify-center p-6 shadow-inner select-none">
            {/* Soft grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
            
            {/* T-Shirt SVG Backdrop */}
            <div className="w-full h-full flex items-center justify-center z-10 pointer-events-none">
              {currentSide === 'front' ? (
                <ShirtFrontSVG colorHex={selectedColor.hex} />
              ) : (
                <ShirtBackSVG colorHex={selectedColor.hex} />
              )}
            </div>

            {/* Print Zone dashed boundary (Absolute positioning relative to canvas container) */}
            <div 
              ref={printZoneRef}
              className="absolute left-[28%] right-[28%] top-[25%] bottom-[22%] border-2 border-dashed border-neutral-800 rounded z-20 flex items-center justify-center overflow-hidden"
            >
              {activeImage ? (
                <motion.div
                  drag
                  dragConstraints={printZoneRef}
                  dragElastic={0.05}
                  style={{
                    scale: activeScale,
                    rotate: `${activeRotate}deg`,
                  }}
                  className="relative w-28 h-28 cursor-grab active:cursor-grabbing flex items-center justify-center z-30"
                >
                  <img 
                    src={activeImage} 
                    alt="Uploaded artwork element" 
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </motion.div>
              ) : (
                <div className="text-center text-neutral-600 font-extrabold uppercase text-[10px] tracking-widest select-none p-4 pointer-events-none">
                  PRINT ZONE
                </div>
              )}
            </div>

            {/* Watermark overlay info */}
            <div className="absolute bottom-4 left-4 text-[9px] font-black text-neutral-700 tracking-wider">
              {currentSide.toUpperCase()} VIEW  |  {selectedColor.name.toUpperCase()}
            </div>
          </div>

          {/* Quick Front/Back View Toggles */}
          <div className="flex gap-4 border border-neutral-900 bg-neutral-950 p-1.5 rounded-sm">
            <button 
              onClick={() => setCurrentSide('front')}
              className={`px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-sm transition-all duration-300 ${
                currentSide === 'front' ? 'bg-accent text-black font-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Front Design
            </button>
            <button 
              onClick={() => setCurrentSide('back')}
              className={`px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-sm transition-all duration-300 ${
                currentSide === 'back' ? 'bg-accent text-black font-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Back Design
            </button>
          </div>
        </div>

        {/* Right: Design Controls Sidebar (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-card-bg border border-neutral-900 rounded-lg p-6 flex flex-col gap-8 shadow-md">
          
          {/* Step 1: Fabric color */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              1. Fabric Color
            </h3>
            <div className="flex flex-wrap gap-3 mt-1">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor.name === color.name 
                      ? 'border-accent scale-105 shadow' 
                      : 'border-neutral-800 hover:border-neutral-600'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor.name === color.name && (
                    <Check className={`w-4 h-4 ${color.hex === '#F3F4F6' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">{selectedColor.name}</span>
          </div>

          {/* Step 2: Artwork uploader */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              2. Upload Artwork
            </h3>
            
            {!activeImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-neutral-800 hover:border-accent/40 rounded bg-neutral-950 p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors text-center"
              >
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-300">Choose file or drop</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">PNG, JPG (Max 10MB)</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between border border-neutral-800 bg-neutral-950 p-4 rounded">
                <div className="flex items-center gap-3">
                  <img src={activeImage} className="w-10 h-10 object-contain bg-neutral-900 border border-neutral-800 rounded" alt="Thumbnail" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-white">Custom Graphic Loaded</p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Side: {currentSide}</p>
                  </div>
                </div>
                <button 
                  onClick={handleRemoveImage}
                  className="text-neutral-500 hover:text-red-500 transition-colors p-1"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/png, image/jpeg, image/jpg" 
              className="hidden" 
            />
          </div>

          {/* Step 3: Transformation controls */}
          <AnimatePresence>
            {activeImage && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-4 overflow-hidden"
              >
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  3. Adjust Graphic
                </h3>
                
                {/* Scale range */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider">
                    <span className="flex items-center gap-1.5"><Maximize2 className="w-3.5 h-3.5" /> Scale</span>
                    <span className="tabular-nums">{(activeScale * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.2" 
                    max="1.5" 
                    step="0.05"
                    value={activeScale}
                    onChange={(e) => setActiveScale(parseFloat(e.target.value))}
                    className="w-full accent-accent bg-neutral-900 rounded" 
                  />
                </div>

                {/* Rotation range */}
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider">
                    <span className="flex items-center gap-1.5"><RotateCw className="w-3.5 h-3.5" /> Rotation</span>
                    <span className="tabular-nums">{activeRotate}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="-180" 
                    max="180" 
                    step="5"
                    value={activeRotate}
                    onChange={(e) => setActiveRotate(parseInt(e.target.value, 10))}
                    className="w-full accent-accent bg-neutral-900 rounded" 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: Size and quantity selection */}
          <div className="grid grid-cols-2 gap-4 border-t border-neutral-900 pt-6">
            
            {/* Size */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Select Size</span>
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 px-3 py-2 rounded text-xs text-white font-bold uppercase tracking-wider focus:outline-none focus:border-accent"
              >
                {['S', 'M', 'L', 'XL', '2XL'].map(sz => (
                  <option key={sz} value={sz}>{sz}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Quantity</span>
              <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded overflow-hidden">
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

          </div>

          {/* Step 5: Pricing breakdown & submit */}
          <div className="border-t border-neutral-900 pt-6 flex flex-col gap-4">
            
            {/* Price lines */}
            <div className="flex flex-col gap-2 text-xs text-neutral-400 font-bold uppercase tracking-wider">
              <div className="flex justify-between">
                <span>Base Streetwear Tee</span>
                <span className="text-white font-black">Rs. {basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Print Cost ({sidesPrinted} Side{sidesPrinted !== 1 ? 's' : ''})</span>
                <span className="text-white font-black">Rs. {sidesPrinted * printSideCost}</span>
              </div>
              <div className="flex justify-between text-sm text-white font-black border-t border-neutral-900 pt-3">
                <span>Unit Price</span>
                <span>Rs. {unitPrice}</span>
              </div>
            </div>

            {/* Main Total price node */}
            <div className="flex justify-between items-baseline mt-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-black">Estimated Total</span>
              <span className="text-2xl font-black text-accent tracking-tighter tabular-nums">Rs. {totalPrice}</span>
            </div>

            {/* Add to Cart button */}
            <button 
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2.5 bg-accent text-black font-extrabold uppercase text-xs tracking-widest py-4.5 rounded-sm hover:bg-white transition-all duration-300 shadow-md mt-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add Custom Order
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
