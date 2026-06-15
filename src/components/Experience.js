import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const experiences = [
  {
    company: "PT. Inovasi Teknologi Olahraga",
    role: "AI Engineer",
    period: "August 2025 – Present",
    type: "Contract · Remote",
    stack: [
      "Python",
      "OpenCV",
      "REST APIs",
      "FFmpeg",
      "LabelMe",
      "Anaconda",
      "Git",
    ],
    description:
      "Designed and developed computer vision pipelines for sports image and video analysis using Python and OpenCV. Built and maintained RESTful APIs for AI inference integration. Developed media and streaming services utilizing FFmpeg for video processing and live streaming workflows.",
  },
  {
    company: "PT. Tjakrabirawa Teknologi Indonesia",
    role: "AI Engineer",
    period: "October 2024 – August 2025",
    type: "Contract · Remote",
    stack: [
      "Python",
      "OpenCV",
      "REST APIs",
      "FFmpeg",
      "LabelMe",
      "Anaconda",
      "Git",
    ],
    description:
      "Built computer vision workflows for sports analytics using annotated datasets and OpenCV pipelines. Developed and maintained RESTful APIs serving AI inference results. Managed Python environments with Anaconda ensuring reproducible setups.",
  },
  {
    company: "PT. Ondel Teknologi Indonesia",
    role: "Full Stack Developer",
    period: "August 2023 – May 2025",
    type: "Contract · Jakarta Utara",
    stack: [
      "Angular",
      "TypeScript",
      "SCSS",
      "Express.js",
      "Node.js",
      "PostgreSQL",
      "Git",
      "JIRA",
    ],
    description:
      "Designed and developed responsive web interfaces and RESTful APIs. Implemented security best practices including authentication and authorization. Integrated third-party APIs and used Agile/Scrum methodology for project delivery.",
  },
];

const Experience = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section
      id="experience"
      className="relative min-h-screen z-10 py-20 px-5 lg:px-32 md:px-10"
    >
      <h2
        className="text-center font-poppins text-[36px] font-bold mb-16 text-white"
        data-aos="fade-up"
      >
        Work{" "}
        <span className="bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text">
          Experience
        </span>
      </h2>

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-red-500 via-red-800/50 to-transparent" />

        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative pl-16 mb-12"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            {/* Dot */}
            <div className="absolute left-[18px] top-3 w-4 h-4 rounded-full bg-red-600 border-2 border-red-400 shadow-[0_0_10px_#A20B0B]" />

            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors duration-300">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                <div>
                  <h3 className="font-poppins font-bold text-lg text-white">
                    {exp.company}
                  </h3>
                  <p className="text-red-400 font-poppins text-sm font-semibold">
                    {exp.role}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-sm font-poppins">
                    {exp.period}
                  </p>
                  <p className="text-white/50 text-xs font-poppins">
                    {exp.type}
                  </p>
                </div>
              </div>
              <p className="text-white/80 text-sm font-poppins leading-relaxed mb-4">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-red-900/40 border border-red-500/30 rounded text-red-300 font-poppins"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
