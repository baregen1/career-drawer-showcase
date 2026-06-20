"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import MotionToggle from "./MotionToggle";
import { useMotion } from "./MotionProvider";

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
  const [view, setView] = useState<"detail" | "apply" | "success">("detail");
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setting } = useMotion();

  // Reset view when role changes or drawer closes
  useEffect(() => {
    if (!role) {
      setView("detail");
      setIsScrolled(false);
    }
  }, [role]);

  // Smooth scroll to top on view change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: setting === "lofi" ? "auto" : "smooth",
      });
    }
  }, [view, setting]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 10);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView("success");
    }, 1500);
  };

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
            className={`fixed inset-0 bg-black/80 z-[500] ${setting === "lofi" ? "" : "backdrop-blur-md"}`}
          />
          
          {/* Drawer */}
          <motion.div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={setting === "lofi" ? { duration: 0 } : { type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed bottom-0 left-0 right-0 h-[92vh] bg-[#0a0a0a] border-t border-[#1e1e1e] rounded-t-[32px] z-[510] overflow-y-auto"
          >
            {/* Sticky Header with backdrop blur */}
            <div className={`sticky top-0 z-20 px-8 py-6 transition-all duration-500 border-b rounded-t-[32px] ${
              isScrolled 
                ? `bg-[#0a0a0a]/80 border-white/5 ${setting === "lofi" ? "" : "backdrop-blur-md"}` 
                : "bg-transparent border-transparent"
            }`}>
              <div className="max-w-3xl mx-auto flex justify-between items-center">
                <div className={`flex flex-col transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#6b6b6b] font-bold">
                    {role.department} · {role.location}
                  </span>
                  <h2 className="text-xl font-bold text-white truncate max-w-[200px] md:max-w-md">{role.title}</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-8 py-12 relative">
              <div className="mt-0">
                <AnimatePresence mode="wait">
                  {view === "detail" && (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex flex-col gap-4 border-b border-[#1e1e1e] pb-10 mb-12">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-[#6b6b6b] font-medium">
                          {role.department} · {role.location} · {role.type}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{role.title}</h2>
                      </div>
                      
                      <div className="space-y-12">
                        <p className="text-[15px] leading-[1.8] text-[#8a8a8a]">{role.description}</p>
                        
                        <div className="space-y-6">
                          <h3 className="text-[11px] uppercase tracking-[0.15em] text-white font-semibold">Responsibilities</h3>
                          <ul className="space-y-4 list-disc pl-5">
                            {role.responsibilities.map((r, i) => (
                              <li key={i} className="text-[14px] leading-[1.7] text-[#8a8a8a] pl-2">{r}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-[11px] uppercase tracking-[0.15em] text-white font-semibold">Requirements</h3>
                          <ul className="space-y-4 list-disc pl-5">
                            {role.requirements.map((r, i) => (
                              <li key={i} className="text-[14px] leading-[1.7] text-[#8a8a8a] pl-2">{r}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-8 border-t border-[#1e1e1e]">
                          <button 
                            onClick={() => setView("apply")}
                            className="w-full py-5 bg-white text-[#0a0a0a] text-[13px] font-bold uppercase tracking-[0.06em] rounded-sm hover:opacity-90 transition-opacity"
                          >
                            Submit Application
                          </button>
                          <div className="flex flex-col items-center gap-6 mt-12">
                            <MotionToggle />
                            <p className="text-center text-[11px] text-[#444] uppercase tracking-widest">
                              Designed by Crossware in Ireland
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {view === "apply" && (
                    <motion.div
                      key="apply"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <button 
                        onClick={() => setView("detail")}
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6b6b6b] hover:text-white transition-colors mb-12"
                      >
                        <ArrowLeft size={14} /> Back to Details
                      </button>

                      <div className="mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 uppercase">Apply for this role</h2>
                        <p className="text-[#6b6b6b] text-sm uppercase tracking-wider">{role.title}</p>
                      </div>

                      <form onSubmit={handleApplySubmit} className="grid grid-cols-1 gap-px bg-[#1e1e1e] border border-[#1e1e1e]">
                        <div className="p-8 bg-[#0a0a0a] flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-[#6b6b6b] font-bold">Full Name</label>
                          <input 
                            required
                            type="text"
                            placeholder="John Doe"
                            className="bg-transparent text-white text-lg font-medium border-none outline-none focus:ring-0 w-full placeholder:text-white/10 rounded-none"
                          />
                        </div>

                        <div className="p-8 bg-[#0a0a0a] flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-[#6b6b6b] font-bold">Email Address</label>
                          <input 
                            required
                            type="email"
                            placeholder="john@example.com"
                            className="bg-transparent text-white text-lg font-medium border-none outline-none focus:ring-0 w-full placeholder:text-white/10 rounded-none"
                          />
                        </div>

                        <div className="p-8 bg-[#0a0a0a] flex flex-col gap-2 min-h-[160px]">
                          <label className="text-[10px] uppercase tracking-widest text-[#6b6b6b] font-bold">Portfolio / Website</label>
                          <input 
                            type="url"
                            placeholder="https://yourportfolio.com"
                            className="bg-transparent text-white text-lg font-medium border-none outline-none focus:ring-0 w-full placeholder:text-white/10 rounded-none"
                          />
                        </div>

                        <div className="p-8 bg-[#0a0a0a] flex flex-col gap-4">
                          <label className="text-[10px] uppercase tracking-widest text-[#6b6b6b] font-bold">Resume / CV</label>
                          <div className="border border-dashed border-white/10 rounded-none p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] transition-colors cursor-pointer group">
                            <p className="text-sm text-[#8a8a8a] group-hover:text-white transition-colors">Attach PDF</p>
                          </div>
                        </div>

                        <div className="p-8 bg-[#0a0a0a] flex flex-col gap-8">
                          <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-white text-[#0a0a0a] text-[13px] font-bold uppercase tracking-[0.2em] rounded-none hover:opacity-90 transition-opacity disabled:opacity-50"
                          >
                            {isLoading ? "Sending..." : "Submit Application"}
                          </button>
                        </div>
                      </form>
                      <div className="flex flex-col items-center gap-6 mt-12 pb-12">
                        <MotionToggle />
                        <p className="text-center text-[11px] text-[#444] uppercase tracking-widest">
                          Designed by Crossware in Ireland
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {view === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-32 text-center"
                    >
                      <p style={{ fontSize: "14px", color: "#66bb99" }}>Application sent. We'll be in touch.</p>
                      <div className="mt-12">
                        <button 
                          onClick={onClose}
                          className="px-12 py-5 bg-white text-[#0a0a0a] text-[10px] font-bold uppercase tracking-[0.3em] rounded-none hover:opacity-90 transition-opacity"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
