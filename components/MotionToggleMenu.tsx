"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotion } from "./MotionProvider";
import { ChevronUp } from "lucide-react";

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
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={setting === "lofi" ? { duration: 0 } : { duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-full right-0 mb-4 w-[300px] bg-[#0a0a0a] border border-[#262626] rounded-[4px] z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSetting(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-5 py-4 transition-all duration-200 relative group flex items-start border rounded-[2px] ${
                    setting === opt.id 
                      ? "bg-[#1a1a1a] border-[#333]" 
                      : "bg-transparent border-transparent hover:bg-[#121212]"
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
        )}
      </AnimatePresence>
    </div>
  );
}
