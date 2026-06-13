"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CareerDrawer from "@/components/CareerDrawer";

const JOBS = [
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    department: "Art",
    location: "Remote",
    type: "Contract",
    description: "We're looking for a Graphic Designer to shape the visual identity of our projects and Crossware Studios, from in-game UI and marketing assets to web and social content. You'll work closely with the art and development team to ensure every touchpoint feels cohesive and cinematic.",
    responsibilities: [
      "Design UI/UX assets, promotional materials, and marketing graphics for our projects",
      "Maintain and evolve the Crossware Studios visual identity across all platforms",
      "Create motion graphics and animated assets for trailers and social media",
      "Collaborate with the web team on visual direction for crosswarestudios.com",
      "Produce print-ready and digital assets for press and events",
    ],
    requirements: [
      "Strong portfolio demonstrating graphic design across digital and print",
      "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, After Effects)",
      "Experience designing for games or entertainment brands preferred",
      "Excellent typographic sensibility and layout instincts",
      "Ability to work independently and meet deadlines in a remote environment",
    ],
  },
  {
    id: "gameplay-programmer",
    title: "Gameplay Programmer",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    description: "We're looking for a Gameplay Programmer to implement the systems and mechanics that define how our projects feels to play. Working closely with the Lead Programmer and design team, you'll translate creative vision into responsive, polished gameplay including core player mechanics, AI behaviour and mission scripting.",
    responsibilities: [
      "Implement and iterate on gameplay systems including player movement, combat, stealth, and interaction",
      "Work alongside designers to prototype, test, and refine game mechanics in Unreal Engine 5",
      "Build and maintain AI behaviours, perception systems, and enemy logic",
      "Develop mission scripting, trigger systems, and gameplay event logic",
      "Debug and resolve gameplay issues identified during playtesting",
      "Collaborate with the animation team on responsive character control and state machines",
      "Write clean, well-documented C++ code that integrates reliably with the broader codebase"
    ],
    requirements: [
      "3+ years of gameplay programming experience in a game development environment",
      "Strong proficiency in Unreal Engine 5 and C++",
      "Solid understanding of game feel, input responsiveness, and player-facing systems",
      "Experience implementing AI systems including behaviour trees and perception",
      "Ability to work closely with non-technical designers and translate intent into code",
      "Shipped at least one game title in a programming role is preferred"
    ],
  },
  {
    id: "lead-writer",
    title: "Lead Writer",
    department: "Narrative",
    location: "Remote",
    type: "Contract",
    description: "We're searching for a Lead Writer to take ownership of narrative, cinematic experiences built around action, identity, and moral ambiguity. You'll craft dialogue, story structure, and world-building that feels grounded, urgent, and character-driven.",
    responsibilities: [
      "Write and edit all primary dialogue, cutscenes, and in-game narrative content",
      "Develop and maintain a consistent tone and voice across all written content",
      "Collaborate with the design team to integrate narrative into gameplay systems",
      "Create lore documents, world-building assets, and in-universe materials",
      "Iterate rapidly based on feedback from playtesting and direction",
    ],
    requirements: [
      "Proven experience writing for games, film, or television",
      "Strong understanding of character-driven storytelling and dramatic structure",
      "Ability to write under creative direction while bringing original ideas",
      "Experience with dialogue systems and branching narrative is a plus",
      "Passion for cinematic storytelling and cinematic action storytelling",
    ],
  }
];

function CareersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);

  useEffect(() => {
    const jobId = searchParams.get("role");
    if (jobId) {
      const job = JOBS.find(j => j.id === jobId);
      if (job) setSelectedJob(job);
    } else {
      setSelectedJob(null);
    }
  }, [searchParams]);

  const openJob = (job: typeof JOBS[0]) => {
    router.push(`?role=${job.id}`, { scroll: false });
  };

  const closeDrawer = () => {
    router.push("/", { scroll: false });
  };

  const grouped = JOBS.reduce((acc, job) => {
    if (!acc[job.department]) acc[job.department] = [];
    acc[job.department].push(job);
    return acc;
  }, {} as Record<string, typeof JOBS>);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-[80px] pb-[120px]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[180px]">
        <header className="mb-16 pb-10 border-b border-[#1e1e1e]">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#6b6b6b] mb-4">Join the team</p>
          <h1 className="text-[36px] font-bold tracking-tight mb-3">Open Roles</h1>
          <p className="text-[13px] text-[#6b6b6b]">{JOBS.length} open positions</p>
        </header>

        <div className="space-y-14">
          {Object.entries(grouped).map(([dept, deptJobs]) => (
            <div key={dept} className="flex flex-col gap-4">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b6b6b] pb-4 border-b border-[#1e1e1e]">
                {dept}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
                {deptJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => openJob(job)}
                    className="flex flex-col justify-between gap-3 p-6 bg-[#111] hover:bg-[#161616] transition-colors text-left min-h-[160px]"
                  >
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#6b6b6b]">
                      {job.department}
                    </span>
                    <span className="text-[18px] font-semibold text-white leading-tight flex-1">
                      {job.title}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-[10px] uppercase tracking-[0.08em] text-[#6b6b6b] border border-[#2a2a2a] px-2 py-1">
                        {job.location}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.08em] text-[#6b6b6b] border border-[#2a2a2a] px-2 py-1">
                        {job.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CareerDrawer role={selectedJob} onClose={closeDrawer} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="bg-[#0a0a0a] min-h-screen" />}>
      <CareersContent />
    </Suspense>
  );
}
