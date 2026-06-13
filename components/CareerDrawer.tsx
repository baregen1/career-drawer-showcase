"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Role {
  id: string;
  title: string;
  description: string;
}

export default function CareerDrawer({ role, onClose }: { role: Role | null; onClose: () => void }) {
  const router = useRouter();
  
  return (
    <AnimatePresence>
      {role && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[80vh] bg-[#0a0a0a] border-t border-white/10 rounded-t-[32px] z-50 p-8 shadow-2xl"
          >
            <div className="max-w-2xl mx-auto relative h-full">
              <button 
                onClick={onClose}
                className="absolute right-0 top-0 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="mt-12">
                <span className="text-white/40 uppercase tracking-widest text-xs font-semibold">Open Position</span>
                <h2 className="text-4xl font-bold mt-2 text-white">{role.title}</h2>
                
                <div className="mt-8 space-y-6 text-white/70 leading-relaxed">
                  <p>{role.description}</p>
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">About the role</h3>
                    <p>We are looking for a {role.title} to join our world-class engineering team. You will be responsible for building high-performance, minimalist interfaces that push the boundaries of the modern web.</p>
                  </div>
                  
                  <button className="w-full py-4 bg-white text-black font-semibold rounded-2xl hover:bg-white/90 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
