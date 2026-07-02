'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, LogOut, Package, MapPin, ClipboardList, CheckCircle } from 'lucide-react';
import useUserStore from '@/store/userStore';
import { removeToken } from '@/lib/auth';

export default function AccountPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    removeToken();
    logout();
    router.push('/auth');
  };

  // Mock list of orders for demonstration
  const recentOrders = [
    {
      id: 'ORD-98231',
      date: '2026-06-25',
      total: 999,
      status: 'Shipped', // Placed | Confirmed | Packed | Shipped | Delivered
      itemsCount: 1,
      trackingNumber: 'TRACK-IND-9281'
    },
    {
      id: 'ORD-97441',
      date: '2026-06-18',
      total: 1998,
      status: 'Delivered',
      itemsCount: 2,
      trackingNumber: 'TRACK-IND-8812'
    }
  ];

  // Tracker steps layout
  const steps = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];
  const getStepIndex = (status) => steps.indexOf(status);

  // Fallback if not logged in
  if (!user) {
    return (
      <div className="bg-[#0D0D0D] text-white min-h-[90vh] flex flex-col items-center justify-center gap-6 p-6">
        <ClipboardList className="w-12 h-12 text-neutral-600" />
        <div className="text-center">
          <h2 className="text-xl font-black uppercase tracking-tight">Access Denied</h2>
          <p className="text-neutral-500 text-xs mt-1 uppercase tracking-wider">Please sign in to view your dashboard</p>
        </div>
        <Link 
          href="/auth" 
          className="bg-accent text-black font-extrabold uppercase text-xs tracking-widest px-8 py-3.5 rounded"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] text-white min-h-[90vh] py-12 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
        
        {/* Left Column: Profile Summary Sidebar (lg:col-span-4) */}
        <aside className="lg:col-span-4 bg-card-bg border border-neutral-900 rounded-lg p-6 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-4 border-b border-neutral-900 pb-6">
            <div className="w-14 h-14 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-accent text-lg font-black">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-tight text-white">{user.name}</h2>
              <p className="text-neutral-500 text-xs mt-0.5 truncate max-w-[200px]">{user.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
            <Link href="/account" className="flex items-center gap-3 text-accent transition-colors">
              <User className="w-4 h-4" /> Profile Details
            </Link>
            <Link href="/account/orders" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors">
              <Package className="w-4 h-4" /> My Order Log
            </Link>
            <button className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors text-left">
              <MapPin className="w-4 h-4" /> Address Manager
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors text-left border-t border-neutral-900 pt-4 mt-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* Right Column: Dashboard Details & Tracker (lg:col-span-8) */}
        <main className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Active order status tracking */}
          <div className="border border-neutral-900 bg-card-bg rounded-lg p-6">
            <span className="text-accent text-[10px] font-black uppercase tracking-widest block mb-1">REAL-TIME DISPATCH</span>
            <h3 className="text-lg font-black uppercase tracking-tight text-white mb-6">Track Active Order</h3>

            {recentOrders.length > 0 && recentOrders[0].status !== 'Delivered' ? (
              <div className="flex flex-col gap-6">
                {/* Order Meta details */}
                <div className="flex justify-between items-baseline border-b border-neutral-900 pb-4 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  <span>Order: <strong className="text-white">{recentOrders[0].id}</strong></span>
                  <span>Tracking: <strong className="text-white">{recentOrders[0].trackingNumber}</strong></span>
                </div>

                {/* Timeline visual bar */}
                <div className="relative flex justify-between items-center py-6">
                  {/* Progress Line */}
                  <div className="absolute left-0 right-0 top-1/2 h-1 bg-neutral-950 -translate-y-1/2 z-0 rounded-full">
                    <div 
                      className="h-full bg-accent transition-all duration-500" 
                      style={{ width: `${(getStepIndex(recentOrders[0].status) / (steps.length - 1)) * 100}%` }}
                    />
                  </div>

                  {/* Timeline steps dots */}
                  {steps.map((step, idx) => {
                    const isActive = idx <= getStepIndex(recentOrders[0].status);
                    return (
                      <div key={step} className="relative z-10 flex flex-col items-center gap-2.5">
                        <div 
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            isActive 
                              ? 'bg-accent border-accent text-black font-black scale-105 shadow' 
                              : 'bg-neutral-950 border-neutral-800 text-neutral-600'
                          }`}
                        >
                          {isActive ? <CheckCircle className="w-4 h-4 fill-current stroke-accent text-black" /> : idx + 1}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-neutral-600'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider p-4 text-center">
                No active orders at this moment.
              </div>
            )}
          </div>

          {/* Past Orders table */}
          <div className="border border-neutral-900 bg-card-bg rounded-lg p-6">
            <h3 className="text-lg font-black uppercase tracking-tight text-white mb-6">Recent Transactions</h3>
            
            <div className="flex flex-col gap-4">
              {recentOrders.map(order => (
                <div key={order.id} className="border border-neutral-900 bg-[#0D0D0D] p-5 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-white">{order.id}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Placed on {order.date}  |  {order.itemsCount} Item{order.itemsCount !== 1 ? 's' : ''}</p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <span className="text-sm font-black text-white">Rs. {order.total}</span>
                    <Link 
                      href="/account/orders"
                      className="border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-400 hover:text-white px-4 py-2.5 text-[9px] font-black uppercase tracking-wider transition-colors rounded-sm"
                    >
                      View Invoice
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>

      </div>
    </div>
  );
}
