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
      description: "Disables all transitions, blurs, and performance-heavy effects for maximum speed.",
    },
  ] as const;

  return (
    <div className="relative font-sans" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-[#0a0a0a] border border-[#1e1e1e] hover:border-[#444] transition-colors group"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] group-hover:text-white transition-colors">
          Motion: <span className="text-white">{setting === "hifi" ? "Hi-Fi" : "Lo-Fi"}</span>
        </span>
        <ChevronUp size={12} className={`text-[#444] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={setting === "lofi" ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full right-0 mb-3 w-[280px] bg-[#0a0a0a] border border-[#1c1c1c] z-[100] shadow-2xl"
          >
            <div className="p-2 space-y-1">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSetting(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-4 transition-colors relative group ${
                    setting === opt.id ? "bg-[#111]" : "hover:bg-[#161616]"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${
                      setting === opt.id ? "text-[#66bb99]" : "text-white"
                    }`}>
                      {opt.label}
                    </span>
                    {setting === opt.id && (
                      <div className="w-1 h-1 bg-[#66bb99]" />
                    )}
                  </div>
                  <p className="text-[10px] leading-relaxed text-[#444] group-hover:text-[#888] transition-colors uppercase tracking-wider">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
