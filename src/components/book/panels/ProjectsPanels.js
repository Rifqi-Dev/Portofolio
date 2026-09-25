import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

// Neon outline card style (shared by the stack chips and the CTA button).
const NEON =
  "bg-white/[0.06] md:bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)]";

export const projects = [
  {
    name: "FLOW — Personal Finance Tracker",
    url: "http://flow.kapuyuaxdev.my.id/",
    screenshot:
      "https://api.screenshotmachine.com?key=67285c&url=http://flow.kapuyuaxdev.my.id/&dimension=1024x600",
    description:
      "Offline-first PWA for tracking expenses, income, loans, budgets, savings, and pockets with optional Google-authenticated cloud sync across devices.",
    stack: [
      "React 19",
      "Vite",
      "TypeScript",
      "Zustand",
      "Dexie (IndexedDB)",
      "Recharts",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Docker",
    ],
  },
];

// Left page of the FLOW spread — screenshot only.
export const FlowScreenshotPanel = () => {
  const project = projects[0];
  return (
    <div className="relative h-full min-h-[180px] md:min-h-[280px] rounded-xl overflow-hidden bg-white/[0.06] md:bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)]">
      <img
        loading="lazy"
        className="w-full h-full object-cover"
        src={project.screenshot}
        alt={project.name}
      />
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-center justify-center gap-2 text-white"
      >
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  );
};

// Right page of the FLOW spread — title, description, stack, CTA.
export const FlowDescriptionPanel = () => {
  const project = projects[0];
  return (
    <div>
      <h4 className="text-archive-text font-cormorant font-bold text-xl mb-2">
        {project.name}
      </h4>
      <p className="text-archive-text/80 font-inter text-sm leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className={`px-2.5 py-1 text-xs rounded-lg text-archive-text ${NEON} font-inter`}
          >
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center gap-2 ${NEON} hover:border-archive-glow hover:shadow-[0_0_16px_rgba(96,140,255,0.55),inset_0_0_10px_rgba(96,140,255,0.3)] transition-all duration-300 text-archive-text px-5 py-2 rounded-xl font-inter text-sm w-fit`}
      >
        Visit Site <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  );
};
