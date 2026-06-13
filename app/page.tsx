"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CareerDrawer from "@/components/CareerDrawer";

const ROLES = [
  { id: "creative-lead", title: "Creative Lead", description: "Design the future of interactive storytelling and digital brand identity." },
  { id: "game-engineer", title: "Game Engineer", description: "Develop high-performance systems for our next-generation engine." },
  { id: "product-designer", title: "Product Designer", description: "Craft pixel-perfect experiences for millions of users worldwide." }
];

function CareersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<typeof ROLES[0] | null>(null);

  useEffect(() => {
    const roleId = searchParams.get("role");
    if (roleId) {
      const role = ROLES.find(r => r.id === roleId);
      if (role) setSelectedRole(role);
    } else {
      setSelectedRole(null);
    }
  }, [searchParams]);

  const openRole = (role: typeof ROLES[0]) => {
    router.push(`?role=${role.id}`, { scroll: false });
  };

  const closeDrawer = () => {
    router.push("/", { scroll: false });
  };

  return (
    <main className="min-h-screen p-24 max-w-4xl mx-auto">
      <header className="mb-20">
        <h1 className="text-6xl font-bold tracking-tight mb-4">Careers</h1>
        <p className="text-white/50 text-xl">Join us in building the next frontier.</p>
      </header>

      <div className="grid gap-4">
        {ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => openRole(role)}
            className="group flex items-center justify-between p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all text-left"
          >
            <div>
              <h3 className="text-2xl font-medium text-white/90 group-hover:text-white transition-colors">{role.title}</h3>
              <p className="text-white/40 mt-1">Full-time · Remote</p>
            </div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              →
            </div>
          </button>
        ))}
      </div>

      <CareerDrawer role={selectedRole} onClose={closeDrawer} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <CareersContent />
    </Suspense>
  );
}
