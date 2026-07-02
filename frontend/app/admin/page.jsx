'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, ShoppingCart, Users, Layers, TrendingUp, Package, ShieldCheck } from 'lucide-react';

export default function AdminPage() {
  // Mock administrative metrics
  const kpis = [
    { label: 'Monthly Revenue', value: 'Rs. 1,48,230', change: '+12.4% vs last month', icon: DollarSign },
    { label: 'Total Orders', value: '148', change: '+8.2% vs last month', icon: ShoppingCart },
    { label: 'Active User growth', value: '+45', change: '180 registered total', icon: Users },
    { label: 'Average Order Value', value: 'Rs. 1,001', change: '+3.5% vs last week', icon: TrendingUp },
  ];

  // Chart data 1: Monthly Revenues
  const monthlyRevenueData = [
    { name: 'Jan', revenue: 42000 },
    { name: 'Feb', revenue: 58000 },
    { name: 'Mar', revenue: 74000 },
    { name: 'Apr', revenue: 89000 },
    { name: 'May', revenue: 110000 },
    { name: 'Jun', revenue: 148230 },
  ];

  // Chart data 2: Orders frequency per day
  const ordersPerDayData = [
    { day: 'Mon', orders: 12 },
    { day: 'Tue', orders: 18 },
    { day: 'Wed', orders: 15 },
    { day: 'Thu', orders: 24 },
    { day: 'Fri', orders: 32 },
    { day: 'Sat', orders: 28 },
    { day: 'Sun', orders: 19 },
  ];

  // Chart data 3: Catalog vs Custom order splits
  const orderSplitData = [
    { name: 'Catalog Purchases', value: 92 },
    { name: 'Custom Printed Tees', value: 56 },
  ];
  
  const COLORS = ['#D4FF00', '#262626'];

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-7xl w-full flex flex-col gap-8 mt-6">
        
        {/* Header Admin section */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between border-b border-neutral-900 pb-6 gap-4">
          <div>
            <span className="text-accent text-[10px] font-black uppercase tracking-widest block mb-1">STORE ADMINISTRATION</span>
            <h1 className="text-3xl font-black uppercase tracking-tight">Admin Console</h1>
            <p className="text-neutral-500 text-xs mt-1 uppercase tracking-wider">Monitor metrics, manage catalog items, and review prints</p>
          </div>

          <div className="flex gap-4">
            <Link 
              href="/admin/products"
              className="bg-neutral-950 border border-neutral-900 hover:border-neutral-700 text-xs font-black uppercase tracking-widest px-5 py-3 rounded-sm transition-all"
            >
              Catalog Manager
            </Link>
            <Link 
              href="/admin/orders"
              className="bg-accent text-black font-black text-xs uppercase tracking-widest px-5 py-3 rounded-sm hover:bg-white transition-all shadow"
            >
              Order Manager
            </Link>
          </div>
        </div>

        {/* Top metrics KPI grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="border border-neutral-900 bg-card-bg rounded-lg p-5 flex items-center justify-between shadow-sm">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-widest">{kpi.label}</span>
                  <strong className="text-xl md:text-2xl font-black text-white tracking-tight">{kpi.value}</strong>
                  <span className="text-[9px] text-accent font-semibold uppercase tracking-wider">{kpi.change}</span>
                </div>
                <div className="w-10 h-10 rounded bg-neutral-950 border border-neutral-900 flex items-center justify-center text-accent">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bar Chart: Monthly Revenue (lg:col-span-8) */}
          <div className="lg:col-span-8 border border-neutral-900 bg-card-bg p-6 rounded-lg shadow-sm flex flex-col gap-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400">Monthly Revenue Stream</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1c1c" vertical={false} />
                  <XAxis dataKey="name" stroke="#525252" fontSize={11} tickLine={false} />
                  <YAxis stroke="#525252" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '4px' }}
                    labelStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase' }}
                    itemStyle={{ color: '#D4FF00', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="revenue" fill="#D4FF00" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Product Splits (lg:col-span-4) */}
          <div className="lg:col-span-4 border border-neutral-900 bg-card-bg p-6 rounded-lg shadow-sm flex flex-col gap-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400">Order Source Breakdown</h3>
            <div className="w-full h-64 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderSplitData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {orderSplitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '4px' }}
                    itemStyle={{ color: '#ffffff', fontSize: '11px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-white">148</span>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold">Total Sales</span>
              </div>
            </div>

            {/* Legends */}
            <div className="flex flex-col gap-2 border-t border-neutral-900 pt-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-accent" /> Catalog Purchases</span>
                <span className="text-white font-black">92 units</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-neutral-800" /> Custom Prints</span>
                <span className="text-white font-black">56 units</span>
              </div>
            </div>
          </div>

        </div>

        {/* Second Chart row */}
        <div className="grid grid-cols-1 gap-8">
          {/* Area Chart: Orders frequencies */}
          <div className="border border-neutral-900 bg-card-bg p-6 rounded-lg shadow-sm flex flex-col gap-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400">Weekly Orders Frequency</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ordersPerDayData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4FF00" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#D4FF00" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1c1c" vertical={false} />
                  <XAxis dataKey="day" stroke="#525252" fontSize={11} tickLine={false} />
                  <YAxis stroke="#525252" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '4px' }}
                    labelStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase' }}
                    itemStyle={{ color: '#D4FF00', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="orders" stroke="#D4FF00" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
