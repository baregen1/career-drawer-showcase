"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const JOBS = [
  { id: "graphic-designer", title: "Graphic Designer" },
  { id: "gameplay-programmer", title: "Gameplay Programmer" },
  { id: "lead-writer", title: "Lead Writer" }
];

function ApplyFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const roleId = searchParams.get("role");
    if (roleId && JOBS.find(j => j.id === roleId)) {
      setSelectedRole(roleId);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-white/5 rounded-none flex items-center justify-center mb-8 border border-[#1c1c1c]">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl font-bold mb-4 tracking-tighter uppercase leading-none">Transmission Received</h1>
        <p className="text-[#666] max-w-md mx-auto mb-10 leading-relaxed uppercase tracking-widest text-[11px] font-bold">
          Your application has been logged. Our recruitment team will review your credentials and contact you if requirements are met.
        </p>
        <Link 
          href="/"
          className="px-10 py-5 bg-white text-[#0a0a0a] text-xs font-black uppercase tracking-[0.3em] rounded-none hover:bg-[#ccc] transition-colors"
        >
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#666] hover:text-white transition-colors mb-16 font-black border border-[#1c1c1c] px-4 py-2"
      >
        <ArrowLeft size={12} /> Exit Portal
      </Link>

      <header className="mb-20 border-b border-[#1c1c1c] pb-12">
        <h1 className="text-6xl font-bold tracking-tighter mb-4 uppercase leading-none">Application Portal</h1>
        <p className="text-[#666] text-sm uppercase tracking-[0.2em] font-bold">Submit credentials for recruitment review.</p>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1c1c1c] border border-[#1c1c1c]">
        {/* Sharp Industrial Panels */}
        <div className="md:col-span-1 p-10 bg-[#0a0a0a] flex flex-col gap-3 group">
          <label className="text-[10px] uppercase tracking-[0.25em] text-[#444] font-black group-hover:text-white transition-colors">Position Code</label>
          <select 
            required
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-transparent text-white text-xl font-bold border-none outline-none focus:ring-0 w-full cursor-pointer appearance-none uppercase tracking-tight"
          >
            <option value="" disabled className="bg-[#0a0a0a]">Select Position</option>
            {JOBS.map(job => (
              <option key={job.id} value={job.id} className="bg-[#0a0a0a]">
                {job.title.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-1 p-10 bg-[#0a0a0a] flex flex-col gap-3 group">
          <label className="text-[10px] uppercase tracking-[0.25em] text-[#444] font-black group-hover:text-white transition-colors">Applicant Name</label>
          <input 
            required
            type="text"
            placeholder="ENTER FULL NAME"
            className="bg-transparent text-white text-xl font-bold border-none outline-none focus:ring-0 w-full placeholder:text-white/5 uppercase tracking-tight"
          />
        </div>

        <div className="md:col-span-2 p-10 bg-[#0a0a0a] flex flex-col gap-3 group">
          <label className="text-[10px] uppercase tracking-[0.25em] text-[#444] font-black group-hover:text-white transition-colors">Communications Endpoint</label>
          <input 
            required
            type="email"
            placeholder="EMAIL@EXAMPLE.COM"
            className="bg-transparent text-white text-xl font-bold border-none outline-none focus:ring-0 w-full placeholder:text-white/5 uppercase tracking-tight"
          />
        </div>

        <div className="md:col-span-2 p-10 bg-[#0a0a0a] flex flex-col gap-3 min-h-[220px] group">
          <label className="text-[10px] uppercase tracking-[0.25em] text-[#444] font-black group-hover:text-white transition-colors">Portfolio Linkage</label>
          <input 
            type="url"
            placeholder="HTTPS://WWW.YOURSITE.COM"
            className="bg-transparent text-white text-xl font-bold border-none outline-none focus:ring-0 w-full placeholder:text-white/5 uppercase tracking-tight"
          />
          <div className="mt-auto pt-4 text-[9px] text-[#333] uppercase tracking-[0.1em] font-bold">
            // Secondary validation for art/engineering disciplines.
          </div>
        </div>

        <div className="md:col-span-2 p-10 bg-[#0a0a0a] flex flex-col gap-6 group">
          <label className="text-[10px] uppercase tracking-[0.25em] text-[#444] font-black group-hover:text-white transition-colors">Document Upload</label>
          <div className="border border-[#1c1c1c] bg-white/[0.02] p-12 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all cursor-pointer group/upload rounded-none">
            <p className="text-[11px] text-[#666] uppercase tracking-[0.2em] font-black group-hover/upload:text-white transition-colors">Attach Resume / CV</p>
            <p className="text-[9px] text-[#333] mt-3 uppercase tracking-widest font-bold">System Acceptable: PDF / DOCX (5MB MAX)</p>
          </div>
        </div>

        <div className="md:col-span-2 p-10 bg-[#0a0a0a] flex flex-col gap-10">
          <p className="text-[10px] text-[#444] leading-[1.8] max-w-2xl uppercase tracking-widest font-bold">
            Submission of this form constitutes agreement to our <span className="text-white underline underline-offset-4 cursor-pointer">Recruitment Privacy Protocols</span>. Data is encrypted and stored in accordance with regional compliance standards.
          </p>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-8 bg-white text-[#0a0a0a] text-[12px] font-black uppercase tracking-[0.4em] rounded-none hover:bg-[#ccc] transition-colors disabled:opacity-50"
          >
            {isLoading ? "PROCESSSING TRANSMISSION..." : "Execute Submission"}
          </button>
        </div>
      </form>

      <footer className="mt-24 pt-12 border-t border-[#1c1c1c] flex justify-between items-center text-[#333]">
        <p className="text-[9px] uppercase tracking-[0.3em] font-black">Crossware Recruitment Division © 2026</p>
        <p className="text-[9px] uppercase tracking-[0.3em] font-black">Confidential</p>
      </footer>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        <ApplyFormContent />
      </Suspense>
    </main>
  );
}
