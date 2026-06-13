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
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Application Received</h1>
        <p className="text-[#6b6b6b] max-w-md mx-auto mb-10 leading-relaxed">
          Thank you for applying. Our team will review your application and get back to you via email if there's a potential match.
        </p>
        <Link 
          href="/"
          className="px-8 py-4 bg-white text-[#0a0a0a] text-xs font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity"
        >
          Return to Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6b6b6b] hover:text-white transition-colors mb-12"
      >
        <ArrowLeft size={14} /> Back to Roles
      </Link>

      <header className="mb-16">
        <h1 className="text-5xl font-bold tracking-tighter mb-4">Apply Now</h1>
        <p className="text-[#6b6b6b] text-lg">Join Crossware Studios and help build the next frontier.</p>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bento Grid Form */}
        <div className="md:col-span-1 p-8 bg-[#111] border border-[#1e1e1e] rounded-2xl flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-[#6b6b6b] font-bold">Role Selection</label>
          <select 
            required
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-transparent text-white text-lg font-medium border-none outline-none focus:ring-0 w-full cursor-pointer appearance-none"
          >
            <option value="" disabled className="bg-[#111]">Select a position</option>
            {JOBS.map(job => (
              <option key={job.id} value={job.id} className="bg-[#111]">
                {job.title}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-1 p-8 bg-[#111] border border-[#1e1e1e] rounded-2xl flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-[#6b6b6b] font-bold">Full Name</label>
          <input 
            required
            type="text"
            placeholder="John Doe"
            className="bg-transparent text-white text-lg font-medium border-none outline-none focus:ring-0 w-full placeholder:text-white/10"
          />
        </div>

        <div className="md:col-span-2 p-8 bg-[#111] border border-[#1e1e1e] rounded-2xl flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-[#6b6b6b] font-bold">Email Address</label>
          <input 
            required
            type="email"
            placeholder="john@example.com"
            className="bg-transparent text-white text-lg font-medium border-none outline-none focus:ring-0 w-full placeholder:text-white/10"
          />
        </div>

        <div className="md:col-span-2 p-8 bg-[#111] border border-[#1e1e1e] rounded-2xl flex flex-col gap-2 min-h-[200px]">
          <label className="text-[10px] uppercase tracking-widest text-[#6b6b6b] font-bold">Portfolio / Website</label>
          <input 
            type="url"
            placeholder="https://yourportfolio.com"
            className="bg-transparent text-white text-lg font-medium border-none outline-none focus:ring-0 w-full placeholder:text-white/10"
          />
          <div className="mt-auto pt-4 text-[11px] text-[#444] italic">
            * Optional but highly recommended for art and design roles.
          </div>
        </div>

        <div className="md:col-span-2 p-8 bg-[#111] border border-[#1e1e1e] rounded-2xl flex flex-col gap-4">
          <label className="text-[10px] uppercase tracking-widest text-[#6b6b6b] font-bold">Resume / CV</label>
          <div className="border-2 border-dashed border-white/5 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] transition-colors cursor-pointer group">
            <p className="text-sm text-[#8a8a8a] group-hover:text-white transition-colors">Click to upload or drag and drop</p>
            <p className="text-[10px] text-[#444] mt-2 uppercase tracking-tighter">PDF (Max 5MB)</p>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-8 pt-8">
          <p className="text-[11px] text-[#6b6b6b] leading-relaxed max-w-2xl">
            By submitting this application, you agree to our <span className="text-white underline underline-offset-4 cursor-pointer">Privacy Policy</span> and <span className="text-white underline underline-offset-4 cursor-pointer">Terms of Service</span>. We'll process your data in accordance with our recruitment procedures.
          </p>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-6 bg-white text-[#0a0a0a] text-[13px] font-bold uppercase tracking-[0.2em] rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Submit Application"}
          </button>
        </div>
      </form>

      <footer className="mt-20 pt-12 border-t border-[#1e1e1e] flex justify-between items-center text-[#444]">
        <p className="text-[10px] uppercase tracking-widest">Crossware Studios © 2026</p>
        <p className="text-[10px] uppercase tracking-widest">MMXXVI</p>
      </footer>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        <ApplyFormContent />
      </Suspense>
    </main>
  );
}
