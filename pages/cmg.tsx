import React, { useEffect, useState, useRef } from 'react';

const CMGLandingPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollStart = 0; // Top of the viewport
      const scrollEnd = window.innerHeight;
      
      // Calculate progress based on how far the container has scrolled through the viewport
      const progress = Math.min(Math.max((window.scrollY) / window.innerHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate panel transformation
  // At progress 0, panels are closed. At progress 1, they are wide open.
  const panelShift = scrollProgress * 50; // Each panel moves 50% away from the center

  return (
    <div className="min-h-[300vh] bg-[#f9f9f7] text-[#1c1c1c] font-sans selection:bg-[#1c1c1c] selection:text-[#f9f9f7]">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 border-b border-[#1c1c1c] bg-[#f9f9f7]/80 backdrop-blur-sm uppercase tracking-widest text-[10px] font-mono">
        <div className="font-bold">CMG / CROSSWARE MEDIA GROUP</div>
        <div className="flex gap-12">
          <a href="#portfolio" className="hover:opacity-50 transition-opacity">Portfolio</a>
          <a href="#investors" className="hover:opacity-50 transition-opacity">Investors</a>
          <a href="#assets" className="hover:opacity-50 transition-opacity">Assets & IP</a>
          <a href="#inquiries" className="hover:opacity-50 transition-opacity">Inquiries</a>
        </div>
      </nav>

      {/* Main Experience Container */}
      <div ref={containerRef} className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-x border-[#1c1c1c] mx-auto max-w-7xl">
        
        {/* Background Layer: Wireframe Blueprints */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-12 gap-8 opacity-80">
          <div className="border border-[#1c1c1c] p-6 flex flex-col justify-between">
            <span className="font-mono text-[10px] uppercase">01 // Portfolio</span>
            <div className="text-4xl font-light tracking-tight">Crossware Studios</div>
          </div>
          <div className="border border-[#1c1c1c] p-6 flex flex-col justify-between bg-[#1c1c1c] text-[#f9f9f7]">
            <span className="font-mono text-[10px] uppercase text-zinc-400">02 // Exploration</span>
            <div className="text-4xl font-light tracking-tight italic">Voyager</div>
          </div>
          <div className="border border-[#1c1c1c] p-6 flex flex-col justify-between">
            <span className="font-mono text-[10px] uppercase">03 // Intellectual Property</span>
            <div className="text-4xl font-light tracking-tight underline decoration-1 underline-offset-8">Assets & IP</div>
          </div>
          <div className="border border-[#1c1c1c] p-6 flex flex-col justify-between">
            <span className="font-mono text-[10px] uppercase">04 // Capital</span>
            <div className="text-4xl font-light tracking-tight">Investors</div>
          </div>
        </div>

        {/* Monolithic Slab Panels (Option 2) */}
        {/* Left Panel */}
        <div 
          className="absolute left-0 top-0 h-full w-1/2 bg-[#f9f9f7] border-r border-[#1c1c1c] z-20 transition-transform duration-75 ease-out"
          style={{ transform: `translateX(-${panelShift}%)` }}
        >
          <div className="h-full w-full flex items-center justify-end pr-12">
            <span className="font-mono text-[10px] uppercase rotate-90 origin-right translate-x-4 opacity-20">Structure</span>
          </div>
        </div>

        {/* Right Panel */}
        <div 
          className="absolute right-0 top-0 h-full w-1/2 bg-[#f9f9f7] border-l border-[#1c1c1c] z-20 transition-transform duration-75 ease-out"
          style={{ transform: `translateX(${panelShift}%)` }}
        >
          <div className="h-full w-full flex items-center justify-start pl-12">
             <span className="font-mono text-[10px] uppercase -rotate-90 origin-left -translate-x-4 opacity-20">Monolith</span>
          </div>
        </div>

        {/* Center Vertical Seam Label */}
        <div 
          className="absolute z-30 font-mono text-[9px] uppercase tracking-[0.2em] transition-opacity duration-300 pointer-events-none"
          style={{ opacity: scrollProgress > 0.1 ? 0 : 1 }}
        >
          Scroll to Decouple
        </div>
      </div>

      {/* Footer / Section Fillers */}
      <section className="h-screen w-full flex items-center justify-center p-24 border-t border-[#1c1c1c]">
        <div className="max-w-2xl text-center">
            <p className="font-mono text-[10px] uppercase mb-8">Establishment // 2026</p>
            <h2 className="text-6xl font-light tracking-tighter mb-12">A new paradigm in holding structures.</h2>
            <div className="w-1 px-12 py-4 border border-[#1c1c1c] inline-block font-mono text-[10px] uppercase cursor-pointer hover:bg-[#1c1c1c] hover:text-[#f9f9f7] transition-all">
                Enter Inquiries
            </div>
        </div>
      </section>
    </div>
  );
};

export default CMGLandingPage;
