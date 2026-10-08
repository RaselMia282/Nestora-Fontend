import React from "react";
import { Sparkles, Lock, ShieldCheck } from "lucide-react";

const Work = () => {
  const steps = [
    {
      number: "01",
      title: "Discover & Match",
      description:
        "Filter certified properties by budget and location, or connect with pre-screened flatmates sharing your exact living cadence.",
      feature: "Proprietary 32-factor sync",
      icon: Sparkles,
    },
    {
      number: "02",
      title: "Book Viewing & Apply",
      description:
        "Schedule on-demand self-guided tours or live virtual walkthroughs. Submit one universal background dossier for all properties.",
      feature: "Self-service smart key unlock",
      icon: Lock,
    },
    {
      number: "03",
      title: "Sign & Live Peacefully",
      description:
        "Execute state-standard leases digitally. Pay your single fractional share via automated escrow without collecting roommate checks.",
      feature: "100% Escrow deposit custody",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
          Effortless Relocation
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          How Nestora Works
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-2 font-medium">
          From initial discovery to digital keys in hand: transparent, secure, and stress-free.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const IconComponent = step.icon;
          return (
            <div
              key={step.number}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Number Badge */}
                <div className="w-10 h-10 rounded-xl bg-slate-100/80 text-slate-900 flex items-center justify-center text-sm font-bold mb-6">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-8">
                  {step.description}
                </p>
              </div>

              {/* Bottom Feature Tag */}
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold pt-4 border-t border-slate-50">
                <IconComponent className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{step.feature}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Work;