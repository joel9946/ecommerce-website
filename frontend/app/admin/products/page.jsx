'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit3, Trash2, ArrowLeft, X, Save, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const INITIAL_PRODUCTS = [
  { id: '1', name: 'Neon Cyber Skull Oversized Tee', price: 999, originalPrice: 1499, category: 'Graphic', stock: 45, graphicColor: '#D4FF00' },
  { id: '2', name: 'Tokyo Vandalism Heavyweight Tee', price: 1099, originalPrice: 1699, category: 'Anime', stock: 32, graphicColor: '#FF2E23' },
  { id: '3', name: 'Cherry Blossom Kanji Drop-Shoulder', price: 999, originalPrice: 1499, category: 'Anime', stock: 18, graphicColor: '#FFB7C5' },
  { id: '4', name: 'Toxic Acid Graphic Oversized Tee', price: 999, originalPrice: 1499, category: 'Graphic', stock: 24, graphicColor: '#39FF14' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form input fields states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('Graphic');
  const [stock, setStock] = useState('');
  const [graphicColor, setGraphicColor] = useState('#D4FF00');

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setName('');
    setPrice('');
    setOriginalPrice('');
    setCategory('Graphic');
    setStock('');
    setGraphicColor('#D4FF00');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (prod) => {
    setEditingProduct(prod);
    setName(prod.name);
    setPrice(prod.price);
    setOriginalPrice(prod.originalPrice || '');
    setCategory(prod.category);
    setStock(prod.stock);
    setGraphicColor(prod.graphicColor);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    const productPayload = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name,
      price: parseInt(price, 10),
      originalPrice: originalPrice ? parseInt(originalPrice, 10) : undefined,
      category,
      stock: parseInt(stock, 10),
      graphicColor,
    };

    if (editingProduct) {
      // Edit mode
      setProducts(products.map(p => p.id === editingProduct.id ? productPayload : p));
    } else {
      // Add mode
      setProducts([...products, productPayload]);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col gap-6 mt-6">
        
        {/* Navigation back */}
        <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-500 hover:text-white transition-colors self-start">
          <ArrowLeft className="w-4 h-4" /> Back to Console
        </Link>

        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
          <div>
            <span className="text-accent text-[10px] font-black uppercase tracking-widest block mb-1">INVENTORY MANAGEMENT</span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Catalog Manager</h1>
          </div>
          
          <button 
            onClick={handleOpenAddForm}
            className="flex items-center gap-2 bg-accent text-black font-black text-xs uppercase tracking-widest px-5 py-3.5 rounded-sm hover:bg-white transition-all shadow"
          >
            <Plus className="w-4.5 h-4.5" /> Add New T-Shirt
          </button>
        </div>

        {/* Products inventory table layout */}
        <div className="border border-neutral-900 bg-card-bg rounded-lg overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-950 text-neutral-500 font-extrabold uppercase tracking-widest border-b border-neutral-900">
                  <th className="p-5">Name & Theme</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Price</th>
                  <th className="p-5">Stock Level</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 font-medium">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-950/40 transition-colors">
                    <td className="p-5 flex items-center gap-3">
                      {/* Color Tag dot */}
                      <span 
                        className="w-3 h-3 rounded-full border border-neutral-800 shrink-0" 
                        style={{ backgroundColor: prod.graphicColor }}
                        title={`Color: ${prod.graphicColor}`}
                      />
                      <span className="font-extrabold text-white uppercase">{prod.name}</span>
                    </td>
                    <td className="p-5 uppercase tracking-wider text-neutral-400 text-[10px]">{prod.category}</td>
                    <td className="p-5 font-black text-white">
                      Rs. {prod.price} 
                      {prod.originalPrice && (
                        <span className="text-neutral-600 font-bold line-through ml-2 text-[10px]">Rs. {prod.originalPrice}</span>
                      )}
                    </td>
                    <td className="p-5">
                      <span className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${
                        prod.stock < 20 
                          ? 'bg-red-950/30 text-red-500 border border-red-900/40' 
                          : 'bg-green-950/30 text-green-500 border border-green-900/40'
                      }`}>
                        {prod.stock} Units
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleOpenEditForm(prod)}
                          className="text-neutral-500 hover:text-white transition-colors p-1.5 border border-neutral-900 rounded bg-neutral-950" 
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="text-neutral-500 hover:text-red-500 transition-colors p-1.5 border border-neutral-900 rounded bg-neutral-950" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add / Edit modal overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <div onClick={() => setIsFormOpen(false)} className="fixed inset-0 bg-black/80" />
          
          {/* Form Modal Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-card-bg border border-neutral-900 rounded-lg max-w-md w-full p-8 shadow-2xl z-10 flex flex-col gap-6"
          >
            <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
              <h2 className="text-lg font-black uppercase tracking-tight">
                {editingProduct ? 'Edit Catalog Tee' : 'Add New T-Shirt'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider text-neutral-400">
              
              {/* Product name */}
              <div className="flex flex-col gap-1.5">
                <label>T-Shirt Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.G. NEON GOTHIC HEAVYWEIGHT TEE"
                  required
                  className="bg-neutral-950 border border-neutral-900 px-3.5 py-2.5 rounded text-white focus:outline-none focus:border-accent font-bold uppercase tracking-wider placeholder:text-neutral-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <div className="flex flex-col gap-1.5">
                  <label>Sale Price (Rs.)</label>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="999"
                    required
                    className="bg-neutral-950 border border-neutral-900 px-3.5 py-2.5 rounded text-white focus:outline-none focus:border-accent font-bold placeholder:text-neutral-700"
                  />
                </div>

                {/* Original price */}
                <div className="flex flex-col gap-1.5">
                  <label>MSRP Price (Rs.)</label>
                  <input 
                    type="number" 
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="1499"
                    className="bg-neutral-950 border border-neutral-900 px-3.5 py-2.5 rounded text-white focus:outline-none focus:border-accent font-bold placeholder:text-neutral-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label>Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-neutral-950 border border-neutral-900 px-3.5 py-2.5 rounded text-white focus:outline-none focus:border-accent font-bold uppercase tracking-wider"
                  >
                    <option value="Graphic">Graphic</option>
                    <option value="Anime">Anime</option>
                    <option value="Minimalist">Minimalist</option>
                  </select>
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-1.5">
                  <label>Stock Level</label>
                  <input 
                    type="number" 
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="50"
                    required
                    className="bg-neutral-950 border border-neutral-900 px-3.5 py-2.5 rounded text-white focus:outline-none focus:border-accent font-bold placeholder:text-neutral-700"
                  />
                </div>
              </div>

              {/* Graphic Color Tag */}
              <div className="flex flex-col gap-1.5">
                <label>Theme Graphic Accent Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={graphicColor}
                    onChange={(e) => setGraphicColor(e.target.value)}
                    className="w-10 h-10 border border-neutral-900 bg-transparent cursor-pointer rounded overflow-hidden shrink-0"
                  />
                  <input 
                    type="text" 
                    value={graphicColor}
                    onChange={(e) => setGraphicColor(e.target.value)}
                    placeholder="#FFFFFF"
                    className="bg-neutral-950 border border-neutral-900 px-3.5 py-2.5 rounded text-white w-full focus:outline-none focus:border-accent font-bold placeholder:text-neutral-700"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 border-t border-neutral-900 pt-6 mt-2">
                <button 
                  type="button" 
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-3 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-white font-extrabold uppercase text-[10px] tracking-widest transition-colors rounded-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 flex items-center justify-center gap-2 bg-accent text-black font-extrabold uppercase text-[10px] tracking-widest py-3 rounded-sm hover:bg-white transition-all shadow"
                >
                  <Save className="w-4 h-4" /> Save Product
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
