"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotion } from "./MotionProvider";
import { ChevronUp, X } from "lucide-react";

export default function MotionToggleMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { setting, setSetting } = useMotion();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    {
      id: "hifi",
      label: "Hi-Fi",
      description: "Enables full motion, cinematic animations, 3D parallax, and heavy backdrop blurs.",
    },
    {
      id: "lofi",
      label: "Lo-Fi",
      description: "Disables all transitions, blurs, and performance-heavy effects for absolute maximum speed.",
    },
  ] as const;

  return (
    <div className="relative font-sans" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-200"
      >
        <span>
          Motion: <span className="text-white font-medium">{setting === "hifi" ? "Hi-Fi" : "Lo-Fi"}</span>
        </span>
        <ChevronUp 
          size={12} 
          className={`text-neutral-500 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[999] md:hidden"
            />
            
            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={setting === "lofi" ? { duration: 0 } : { type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className={`
                fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-[#1c1c1c] rounded-t-[32px] z-[1000] p-6 pb-12
                md:absolute md:bottom-full md:left-auto md:right-0 md:mb-4 md:w-[300px] md:rounded-[4px] md:border md:border-[#262626] md:p-2 md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:overflow-hidden md:pb-2
              `}
            >
              {/* Mobile Header: Handle and Close Button */}
              <div className="flex justify-between items-center mb-6 md:hidden">
                <div className="w-10 h-10" /> {/* Spacer to center handle */}
                <div className="w-9 h-1 bg-[#333] rounded-full" />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-[#111] rounded-full text-neutral-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-2 md:space-y-1">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSetting(opt.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-5 py-4 transition-all duration-200 relative group flex items-start border rounded-[2px] md:rounded-[2px] ${
                      setting === opt.id 
                        ? "bg-[#1a1a1a] border-[#333]" 
                        : "bg-[#111] md:bg-transparent border-transparent hover:bg-[#121212]"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white tracking-tight">
                          {opt.label}
                        </span>
                      </div>
                      <p className="text-neutral-500 text-[11px] leading-relaxed mt-0.5">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
