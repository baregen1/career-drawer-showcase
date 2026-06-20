"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

type MotionSetting = "hifi" | "lofi";

interface MotionContextType {
  setting: MotionSetting;
  setSetting: (setting: MotionSetting) => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [setting, setSetting] = useState<MotionSetting>("hifi");

  useEffect(() => {
    const saved = localStorage.getItem("motion-setting") as MotionSetting;
    if (saved === "hifi" || saved === "lofi") {
      setSetting(saved);
      if (saved === "lofi") {
        document.documentElement.classList.add("disable-motion-effects");
      }
    }
  }, []);

  const updateSetting = (newSetting: MotionSetting) => {
    setSetting(newSetting);
    localStorage.setItem("motion-setting", newSetting);
    
    if (newSetting === "lofi") {
      document.documentElement.classList.add("disable-motion-effects");
    } else {
      document.documentElement.classList.remove("disable-motion-effects");
    }
  };

  return (
    <MotionContext.Provider value={{ setting, setSetting: updateSetting }}>
      <MotionConfig transition={setting === "lofi" ? { duration: 0 } : undefined}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (context === undefined) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}
