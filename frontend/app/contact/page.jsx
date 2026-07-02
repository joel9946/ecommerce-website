'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Query');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5 text-accent" />,
      label: "Support Dispatch Email",
      value: "hello@customprint.com",
      action: "mailto:hello@customprint.com"
    },
    {
      icon: <Phone className="w-5 h-5 text-accent" />,
      label: "Customer Helpline Number",
      value: "+91 98765 43210",
      action: "tel:+919876543210"
    },
    {
      icon: <MapPin className="w-5 h-5 text-accent" />,
      label: "Headquarters Studio",
      value: "Sector 5, HSR Layout, Bengaluru, Karnataka, 560102",
      action: "https://maps.google.com"
    }
  ];

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen py-12 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col gap-12 mt-6">
        
        {/* Header */}
        <div className="text-center lg:text-left">
          <span className="text-accent text-xs font-black uppercase tracking-widest block mb-2">COMMUNICATION HUBS</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Connect with the Collective</h1>
          <p className="text-neutral-500 text-xs md:text-sm uppercase tracking-wider mt-1 max-w-xl">Have a bulk order request, custom canvas feedback, or general support query? Hit us up below.</p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
          
          {/* Left Column: Info Cards (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {contactDetails.map((detail, idx) => (
              <a 
                key={idx}
                href={detail.action}
                target={detail.action.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-6 bg-card-bg border border-neutral-900 rounded-lg hover:border-neutral-800 transition-colors group"
              >
                <div className="w-10 h-10 rounded bg-neutral-950 border border-neutral-900 flex items-center justify-center shrink-0">
                  {detail.icon}
                </div>
                <div className="flex-grow min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 block">{detail.label}</span>
                  <span className="text-xs md:text-sm font-extrabold uppercase text-white tracking-wide block mt-1.5 break-words group-hover:text-accent transition-colors">
                    {detail.value}
                  </span>
                </div>
              </a>
            ))}

            {/* Support statement Card */}
            <div className="border border-neutral-900 bg-neutral-950/40 p-6 rounded-lg flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="text-xs">
                <h4 className="font-extrabold uppercase text-white">Live Assistance Hours</h4>
                <p className="text-neutral-500 leading-relaxed font-semibold uppercase tracking-wider mt-2">
                  Our dispatch & design studio operations are active Monday to Friday from 10:00 AM to 6:00 PM IST. Typical email turnaround is under 2 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-card-bg border border-neutral-900 rounded-lg p-8 shadow-md relative">
            <h3 className="text-base font-black uppercase tracking-tight text-white mb-6">Drop a Message</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider text-neutral-400">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name-input">Your Name</label>
                <input 
                  id="name-input"
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.G. HARSH VARDHAN"
                  required
                  className="bg-neutral-950 border border-neutral-900 px-4 py-3 rounded text-white focus:outline-none focus:border-accent font-bold uppercase tracking-wider placeholder:text-neutral-700 w-full"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email-input">Your Email Address</label>
                <input 
                  id="email-input"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOURNAME@EXAMPLE.COM"
                  required
                  className="bg-neutral-950 border border-neutral-900 px-4 py-3 rounded text-white focus:outline-none focus:border-accent font-bold placeholder:text-neutral-700 w-full"
                />
              </div>

              {/* Query Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject-select">Reason for Contact</label>
                <select 
                  id="subject-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-neutral-950 border border-neutral-900 px-4 py-3 rounded text-white focus:outline-none focus:border-accent font-bold uppercase tracking-wider w-full cursor-pointer"
                >
                  <option value="Product Query">Catalog T-Shirt Queries</option>
                  <option value="Custom Printing">Custom Designer Submissions</option>
                  <option value="Bulk Order">Bulk Creator Inquiries</option>
                  <option value="Shipping/Return">Shipping & Replacement Returns</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message-textarea">Detailed Message</label>
                <textarea 
                  id="message-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="WRITE YOUR MESSAGE DETAILED HERE..."
                  required
                  rows={5}
                  className="bg-neutral-950 border border-neutral-900 px-4 py-3 rounded text-white focus:outline-none focus:border-accent font-bold uppercase tracking-wider placeholder:text-neutral-700 w-full resize-none leading-relaxed"
                />
              </div>

              {/* Submit button */}
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 bg-accent text-black font-extrabold uppercase text-xs tracking-widest py-4.5 rounded-sm hover:bg-white transition-all duration-300 shadow mt-2"
              >
                <Send className="w-4 h-4" /> Send Dispatch Message
              </button>
            </form>

            {/* Submission confirmation Modal overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-neutral-950/95 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-8 text-center gap-4 z-20"
                >
                  <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-accent" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white">Message Transmitted</h3>
                    <p className="text-neutral-500 text-[10px] uppercase tracking-widest mt-1">Our dispatch team will connect back shortly</p>
                  </div>
                  
                  <p className="text-neutral-400 text-xs font-semibold leading-relaxed tracking-wider uppercase max-w-sm">
                    Thank you for reaching out. We have logged your query and sent a receipt dispatch notification to your inbox.
                  </p>
                  
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="border border-neutral-850 hover:border-neutral-700 bg-neutral-900 text-white font-extrabold uppercase text-[10px] tracking-widest px-8 py-3.5 rounded-sm transition-colors mt-2"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
