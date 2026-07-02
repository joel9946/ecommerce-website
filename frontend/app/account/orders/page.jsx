'use client';

import Link from 'next/link';
import { Package, ArrowLeft, Download, ShoppingBag } from 'lucide-react';
import useUserStore from '@/store/userStore';

export default function OrdersPage() {
  const user = useUserStore((state) => state.user);

  const orderLog = [
    {
      id: 'ORD-98231',
      date: '2026-06-25',
      items: [
        { name: 'Neon Cyber Skull Oversized Tee', size: 'XL', quantity: 1, price: 999, custom: false }
      ],
      total: 999,
      status: 'Shipped',
      address: '221B Baker St, London, UK'
    },
    {
      id: 'ORD-97441',
      date: '2026-06-18',
      items: [
        { name: 'Custom Printed Tee - sand', size: 'M', quantity: 1, price: 999, custom: true },
        { name: 'Tokyo Vandalism Heavyweight Tee', size: 'L', quantity: 1, price: 999, custom: false }
      ],
      total: 1998,
      status: 'Delivered',
      address: '221B Baker St, London, UK'
    }
  ];

  if (!user) {
    return (
      <div className="bg-[#0D0D0D] text-white min-h-[90vh] flex flex-col items-center justify-center gap-6 p-6">
        <Package className="w-12 h-12 text-neutral-600" />
        <div className="text-center">
          <h2 className="text-xl font-black uppercase tracking-tight">Access Denied</h2>
          <p className="text-neutral-500 text-xs mt-1 uppercase tracking-wider">Please sign in to view your orders</p>
        </div>
        <Link href="/auth" className="bg-accent text-black font-extrabold uppercase text-xs tracking-widest px-8 py-3.5 rounded">
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] text-white min-h-[90vh] py-12 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col gap-6 mt-6">
        
        {/* Back Link */}
        <Link href="/account" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-500 hover:text-white transition-colors self-start">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div>
          <span className="text-accent text-[10px] font-black uppercase tracking-widest block mb-1">TRANSACTION RECORD</span>
          <h1 className="text-3xl font-black uppercase tracking-tight">My Order Log</h1>
          <p className="text-neutral-500 text-xs mt-1 uppercase tracking-wider">Inspect previous purchases, downloads, and custom receipts</p>
        </div>

        {/* Orders Log list */}
        <div className="flex flex-col gap-8 mt-4">
          {orderLog.map((order) => (
            <div key={order.id} className="border border-neutral-900 bg-card-bg rounded-lg overflow-hidden">
              
              {/* Top Order header */}
              <div className="bg-neutral-950 border-b border-neutral-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-bold uppercase tracking-wider">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-neutral-400">
                  <span>Order Date: <strong className="text-white">{order.date}</strong></span>
                  <span>ID: <strong className="text-white">{order.id}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black tracking-widest bg-accent text-black px-2 py-0.5 rounded-sm">
                    {order.status}
                  </span>
                  <button className="text-neutral-500 hover:text-white transition-colors p-1" title="Download Invoice">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items in order */}
              <div className="p-6 flex flex-col gap-4 border-b border-neutral-900">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4 text-xs">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded border border-neutral-800 bg-neutral-950 flex items-center justify-center text-neutral-600">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-extrabold text-white uppercase">{item.name}</span>
                        <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">
                          Size: {item.size}  |  Qty: {item.quantity}  |  {item.custom ? 'CUSTOM DESIGN' : 'CATALOG'}
                        </span>
                      </div>
                    </div>
                    <span className="font-black text-white">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Summary totals */}
              <div className="bg-neutral-950/40 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-bold text-neutral-500">
                <div className="flex flex-col gap-0.5">
                  <span className="uppercase tracking-wider text-[10px]">DELIVERY ADDRESS</span>
                  <p className="text-neutral-400 font-semibold">{order.address}</p>
                </div>
                <div className="flex items-baseline gap-2 self-end sm:self-auto text-sm">
                  <span className="uppercase tracking-widest text-[10px]">Total Paid</span>
                  <strong className="text-base text-white font-black">Rs. {order.total}</strong>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
