'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, RefreshCw, X, Check, EyeOff } from 'lucide-react';

const INITIAL_ORDERS = [
  {
    id: 'ORD-98231',
    customer: 'Kabir Sharma',
    email: 'kabir@gmail.com',
    date: '2026-06-25',
    total: 999,
    status: 'Shipped',
    custom: false,
    items: [{ name: 'Neon Cyber Skull Oversized Tee', size: 'XL', qty: 1 }],
  },
  {
    id: 'ORD-97441',
    customer: 'Aanya Patel',
    email: 'aanya@outlook.com',
    date: '2026-06-18',
    total: 1998,
    status: 'Delivered',
    custom: true,
    items: [
      { name: 'Custom Printed Tee - Sand', size: 'M', qty: 1, graphic: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300' },
      { name: 'Tokyo Vandalism Heavyweight Tee', size: 'L', qty: 1 }
    ],
  },
  {
    id: 'ORD-96112',
    customer: 'Devansh Verma',
    email: 'devansh@yahoo.com',
    date: '2026-06-15',
    total: 799,
    status: 'Placed',
    custom: true,
    items: [
      { name: 'Custom Printed Tee - Pitch Black', size: 'L', qty: 1, graphic: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=300' }
    ],
  }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [inspectingOrder, setInspectingOrder] = useState(null);

  const handleUpdateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const steps = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col gap-6 mt-6">
        
        {/* Navigation back */}
        <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-500 hover:text-white transition-colors self-start">
          <ArrowLeft className="w-4 h-4" /> Back to Console
        </Link>

        {/* Header toolbar */}
        <div className="flex justify-between items-center border-b border-neutral-900 pb-6">
          <div>
            <span className="text-accent text-[10px] font-black uppercase tracking-widest block mb-1">SALES & DISPATCH</span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Order Manager</h1>
          </div>
        </div>

        {/* Orders Log list table */}
        <div className="border border-neutral-900 bg-card-bg rounded-lg overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-950 text-neutral-500 font-extrabold uppercase tracking-widest border-b border-neutral-900">
                  <th className="p-5">Order ID & Date</th>
                  <th className="p-5">Customer Details</th>
                  <th className="p-5">Type</th>
                  <th className="p-5">Order Total</th>
                  <th className="p-5">Dispatch Status</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 font-medium">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-950/40 transition-colors">
                    <td className="p-5">
                      <div className="flex flex-col gap-1">
                        <span className="font-extrabold text-white">{order.id}</span>
                        <span className="text-[10px] text-neutral-500 font-bold">{order.date}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-white font-extrabold">{order.customer}</span>
                        <span className="text-[10px] text-neutral-500 font-bold">{order.email}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 rounded-sm font-black text-[9px] uppercase tracking-widest ${
                        order.custom 
                          ? 'bg-accent/10 border border-accent/20 text-accent' 
                          : 'bg-neutral-950 border border-neutral-900 text-neutral-400'
                      }`}>
                        {order.custom ? 'Custom print' : 'Catalog'}
                      </span>
                    </td>
                    <td className="p-5 font-black text-white">Rs. {order.total}</td>
                    <td className="p-5">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 px-2 py-1.5 rounded text-[10px] text-white font-bold uppercase tracking-wider focus:outline-none focus:border-accent"
                      >
                        {steps.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {order.custom ? (
                          <button 
                            onClick={() => setInspectingOrder(order)}
                            className="flex items-center gap-1.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white px-3 py-1.5 rounded text-[9px] font-black uppercase tracking-widest transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" /> Inspect Design
                          </button>
                        ) : (
                          <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest p-1">No Artwork</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Inspect Custom print graphic Modal overlay */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <div onClick={() => setInspectingOrder(null)} className="fixed inset-0 bg-black/80" />
          
          {/* Modal Container */}
          <div className="relative bg-card-bg border border-neutral-900 rounded-lg max-w-lg w-full p-8 shadow-2xl z-10 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
              <div>
                <span className="text-accent text-[9px] font-black uppercase tracking-widest block mb-0.5">ARTWORK VALIDATOR</span>
                <h2 className="text-base font-black uppercase tracking-tight text-white">
                  Inspect Custom Print Details
                </h2>
              </div>
              <button onClick={() => setInspectingOrder(null)} className="text-neutral-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="flex justify-between items-baseline border-b border-neutral-900 pb-3 text-neutral-400 font-bold uppercase tracking-wider">
                <span>Order: <strong className="text-white">{inspectingOrder.id}</strong></span>
                <span>Customer: <strong className="text-white">{inspectingOrder.customer}</strong></span>
              </div>

              {/* Mock shirt display with custom graphic printed */}
              <div className="flex flex-col items-center gap-4 bg-neutral-950 p-6 rounded border border-neutral-900">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Client Uploaded Graphic</p>
                <div className="relative w-36 h-36 bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center p-4">
                  {inspectingOrder.items.find(i => i.graphic) ? (
                    <img 
                      src={inspectingOrder.items.find(i => i.graphic).graphic} 
                      className="w-full h-full object-contain filter drop-shadow-md" 
                      alt="Custom Print Artwork" 
                    />
                  ) : (
                    <div className="text-[10px] text-neutral-600 font-bold uppercase">Generic Vector Graphic</div>
                  )}
                </div>
              </div>

              {/* Items checklist */}
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider">Requested Items</span>
                {inspectingOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-neutral-300 font-semibold uppercase tracking-tight py-1">
                    <span>{item.name} ({item.size})</span>
                    <span className="text-white font-black">{item.qty} units</span>
                  </div>
                ))}
              </div>

              {/* Approve / Reject Actions */}
              <div className="flex gap-4 border-t border-neutral-900 pt-6 mt-2">
                <button 
                  onClick={() => { alert('Design rejected. Notification email sent to customer.'); setInspectingOrder(null); }}
                  className="flex-1 py-3 bg-neutral-950 border border-neutral-900 hover:border-red-900/40 text-neutral-500 hover:text-red-500 font-extrabold uppercase text-[10px] tracking-widest transition-colors rounded-sm"
                >
                  Reject Design
                </button>
                <button 
                  onClick={() => { alert('Design approved and released to production!'); setInspectingOrder(null); }}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent text-black font-extrabold uppercase text-[10px] tracking-widest py-3 rounded-sm hover:bg-white transition-all shadow"
                >
                  <Check className="w-4 h-4" /> Approve Print
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
