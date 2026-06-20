"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
    if (saved) setSetting(saved);
  }, []);

  const updateSetting = (newSetting: MotionSetting) => {
    setSetting(newSetting);
    localStorage.setItem("motion-setting", newSetting);
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
