'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import useCartStore from '@/store/cartStore';

export default function CartSidebar() {
  const items = useCartStore((state) => state.items);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    alert("Proceeding to checkout with Razorpay Gateway Integration...");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-[100] cursor-pointer"
          />

          {/* Sliding Side Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#0D0D0D] border-l border-neutral-900 z-[101] flex flex-col justify-between shadow-2xl select-none"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-neutral-900 flex justify-between items-center bg-neutral-950">
              <span className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                <ShoppingBag className="w-4.5 h-4.5 text-accent" /> Shopping Cart ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </span>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-6">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4 border-b border-neutral-900/60 pb-6 last:border-b-0">
                    
                    {/* Item Thumbnail */}
                    <div className="w-16 h-20 rounded bg-neutral-950 border border-neutral-900 flex items-center justify-center overflow-hidden shrink-0 relative">
                      {item.custom && item.frontDesign ? (
                        <img 
                          src={item.frontDesign} 
                          alt="Custom print preview" 
                          className="w-full h-full object-contain p-1"
                        />
                      ) : item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="text-[10px] text-neutral-600 font-bold uppercase p-2 text-center">
                          {item.custom ? 'Custom' : 'TEE'}
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col gap-1.5 text-xs">
                      <span className="font-extrabold text-white uppercase leading-tight truncate max-w-[200px]" title={item.name}>
                        {item.name}
                      </span>
                      
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
                        Size: {item.size}  |  Color: {item.color}
                      </div>

                      {/* Quantity editors */}
                      <div className="flex items-center border border-neutral-900 rounded bg-black w-24 h-8 mt-1.5">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2.5 h-full hover:bg-neutral-900 text-neutral-500 hover:text-white transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="flex-grow text-center text-[10px] font-black tabular-nums">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 h-full hover:bg-neutral-900 text-neutral-500 hover:text-white transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Price and delete action */}
                    <div className="flex flex-col items-end gap-3 justify-between h-20 shrink-0 text-xs">
                      <span className="font-black text-white tabular-nums">Rs. {item.price * item.quantity}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-red-500 p-1 border border-neutral-900 rounded hover:border-neutral-800 bg-neutral-950 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center text-neutral-500 select-none">
                  <ShoppingBag className="w-10 h-10 text-neutral-800" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Your Cart is Empty</p>
                    <p className="text-[10px] uppercase tracking-wider text-neutral-600 mt-1">Browse T-shirts to get started</p>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer totals */}
            {items.length > 0 && (
              <div className="p-6 border-t border-neutral-900 bg-neutral-950 flex flex-col gap-4">
                <div className="flex justify-between items-baseline text-xs font-bold uppercase tracking-wider text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-lg font-black text-white tracking-tighter tabular-nums">Rs. {subtotal}</span>
                </div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Shipping and taxes calculated at checkout.</p>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-accent text-black font-extrabold uppercase text-xs tracking-widest py-4.5 rounded-sm hover:bg-white transition-all duration-300 shadow-md mt-2 flex items-center justify-center gap-2"
                >
                  Checkout Order
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
