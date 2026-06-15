import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const projects = [
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
    featured: true,
  },
];

const Projects = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section
      id="projects"
      className="relative min-h-screen z-10 py-20 px-5 lg:px-32 md:px-10"
    >
      <h2
        className="text-center font-poppins text-[36px] font-bold mb-12 text-white"
        data-aos="fade-up"
      >
        My{" "}
        <span className="bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text">
          Projects
        </span>
      </h2>

      {/* Featured project */}
      {projects.map((project, i) => (
        <div
          key={i}
          className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl overflow-hidden mb-10 hover:bg-white/15 transition-all duration-300"
          data-aos="fade-up"
        >
          <div className="md:flex">
            <div className="md:w-1/2 relative overflow-hidden">
              <img
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className="text-red-400 text-xs font-poppins font-semibold mb-2 uppercase tracking-widest">
                Featured Project
              </span>
              <h3 className="text-white font-poppins font-bold text-2xl mb-3">
                {project.name}
              </h3>
              <p className="text-white/80 font-poppins text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-red-900/40 border border-red-500/30 rounded text-red-300 font-poppins"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-red-800 hover:bg-white text-white hover:text-red-800 px-5 py-2 rounded-md transition-all duration-300 font-poppins text-sm w-fit"
              >
                Visit Site <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
