"use client";

import { useMotion } from "./MotionProvider";

export default function MotionToggle() {
  const { setting, setSetting } = useMotion();

  return (
    <div className="flex items-center gap-px bg-[#1c1c1c] border border-[#1c1c1c] p-0 font-sans">
      <button
        onClick={() => setSetting("hifi")}
        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
          setting === "hifi"
            ? "bg-[#66bb99] text-[#0a0a0a]"
            : "bg-[#0a0a0a] text-[#444] hover:text-[#888]"
        }`}
      >
        Hi-Fi
      </button>
      <button
        onClick={() => setSetting("lofi")}
        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
          setting === "lofi"
            ? "bg-[#66bb99] text-[#0a0a0a]"
            : "bg-[#0a0a0a] text-[#444] hover:text-[#888]"
        }`}
      >
        Lo-Fi
      </button>
    </div>
  );
}
