"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";

interface Role {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export default function CareerDrawer({ role, onClose }: { role: Role | null; onClose: () => void }) {
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
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[500]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-[#0a0a0a] border-l border-[#1c1c1c] z-[510] overflow-y-auto rounded-none shadow-2xl"
          >
            <div className="px-8 md:px-12 py-16 relative min-h-screen flex flex-col">
              <button 
                onClick={onClose}
                className="absolute right-8 top-12 p-2 bg-white/5 hover:bg-white text-white hover:text-black transition-all rounded-none border border-[#1c1c1c]"
              >
                <X size={20} />
              </button>
              
              <div className="mt-8 flex-1">
                <div className="flex flex-col gap-4 border-b border-[#1c1c1c] pb-12 mb-12">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#666] font-black">
                    {role.department} // {role.location} // {role.type}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase leading-none">{role.title}</h2>
                </div>
                
                <div className="space-y-16">
                  <p className="text-[16px] leading-[1.6] text-[#888] font-medium">{role.description}</p>
                  
                  <div className="space-y-8">
                    <h3 className="text-[10px] uppercase tracking-[0.25em] text-white font-black border-l-2 border-white pl-4">Responsibilities</h3>
                    <ul className="space-y-6">
                      {role.responsibilities.map((r, i) => (
                        <li key={i} className="text-[14px] leading-[1.6] text-[#666] border-b border-[#1c1c1c] pb-4 last:border-none">{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-[10px] uppercase tracking-[0.25em] text-white font-black border-l-2 border-white pl-4">Requirements</h3>
                    <ul className="space-y-6">
                      {role.requirements.map((r, i) => (
                        <li key={i} className="text-[14px] leading-[1.6] text-[#666] border-b border-[#1c1c1c] pb-4 last:border-none">{r}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-12 mt-20 border-t border-[#1c1c1c]">
                    <Link 
                      href={`/apply?role=${role.id}`}
                      className="block w-full py-6 bg-white text-[#0a0a0a] text-[12px] font-black uppercase tracking-[0.3em] rounded-none hover:bg-[#ccc] transition-colors text-center"
                    >
                      Submit Application
                    </Link>
                    <div className="flex justify-between items-center mt-8 text-[9px] text-[#444] uppercase tracking-[0.2em] font-bold">
                      <span>Ref: {role.id.toUpperCase()}</span>
                      <span>MMXXVI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
