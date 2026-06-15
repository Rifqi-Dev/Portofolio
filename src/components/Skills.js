import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJs,
  faPython,
  faReact,
  faAngular,
  faNodeJs,
  faGitAlt,
  faDocker,
  faLinux,
  faCss3Alt,
} from "@fortawesome/free-brands-svg-icons";
import {
  faServer,
  faEye,
  faTag,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const DEVICON = (id) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${id}.svg`;

const hardSkills = [
  { name: "JavaScript", fa: faJs, color: "#F7DF1E" },
  { name: "TypeScript", img: DEVICON("typescript/typescript-original") },
  { name: "React", fa: faReact, color: "#61DAFB" },
  { name: "Angular", fa: faAngular, color: "#DD0031" },
  { name: "Node.js", fa: faNodeJs, color: "#339933" },
  {
    name: "Express.js",
    img: DEVICON("express/express-original-wordmark"),
    imgClass: "invert",
  },
  { name: "Python", fa: faPython, color: "#3776AB" },
  { name: "OpenCV", img: DEVICON("opencv/opencv-original") },
  { name: "PostgreSQL", img: DEVICON("postgresql/postgresql-original") },
  { name: "MongoDB", img: DEVICON("mongodb/mongodb-original") },
  { name: "Docker", fa: faDocker, color: "#2496ED" },
  { name: "Tailwind CSS", img: DEVICON("tailwindcss/tailwindcss-original") },
  { name: "CSS3", fa: faCss3Alt, color: "#1572B6" },
  { name: "Git", fa: faGitAlt, color: "#F05032" },
  { name: "REST APIs", fa: faServer, color: "#A20B0B" },
  { name: "Computer Vision", fa: faEye, color: "#5C3EE8" },
  { name: "FFmpeg", fa: faCode, color: "#007808" },
  { name: "JIRA", img: DEVICON("jira/jira-original") },
  { name: "Bun", img: DEVICON("bun/bun-original") },
];

const tools = [
  { name: "VS Code", img: DEVICON("vscode/vscode-original") },
  { name: "Linux", fa: faLinux, color: "#FCC624" },
  { name: "Postman", img: DEVICON("postman/postman-original") },
  { name: "Anaconda", img: DEVICON("anaconda/anaconda-original") },
  { name: "LabelMe", fa: faTag, color: "#A20B0B" },
];

const SkillTag = ({ name, fa, img, color, icon, imgClass = "" }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-red-900/20 hover:border-red-500/40 hover:scale-105 transition-all duration-300 cursor-default">
    <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
      {fa ? (
        <FontAwesomeIcon icon={fa} style={{ color }} className="text-base" />
      ) : img ? (
        <img
          src={img}
          alt={name}
          className={`w-4 h-4 object-contain ${imgClass}`}
          loading="lazy"
        />
      ) : icon ? (
        <span className="text-sm leading-none">{icon}</span>
      ) : null}
    </span>
    <span className="text-white/80 text-xs font-poppins whitespace-nowrap">
      {name}
    </span>
  </div>
);

const BentoCard = ({ children, className = "", delay = 0, ...props }) => (
  <div
    className={`backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 ${className}`}
    data-aos="fade-up"
    data-aos-delay={delay}
    {...props}
  >
    {children}
  </div>
);

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-2 mb-4">
    <span className="w-1 h-4 bg-red-500 rounded-full" />
    <span className="font-poppins text-xs font-semibold text-white/50 tracking-[0.2em] uppercase">
      {children}
    </span>
  </div>
);

const Skills = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="skills" className="relative z-10 py-20 px-6 lg:px-32 md:px-10">
      <h2
        className="text-center font-poppins text-[36px] font-bold mb-14 text-white"
        data-aos="fade-up"
      >
        My{" "}
        <span className="bg-gradient-to-r from-red-400 to-red-800 text-transparent bg-clip-text">
          Skills
        </span>
      </h2>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">
        {/* ── Tech Stack — full width ── */}
        <BentoCard className="md:col-span-12" delay={0}>
          <SectionLabel>Tech Stack</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {hardSkills.map((s) => (
              <SkillTag key={s.name} {...s} />
            ))}
          </div>
        </BentoCard>

        {/* ── Dev Environment ── */}
        <BentoCard
          className="md:col-span-5 bg-gradient-to-br from-red-950/20 to-transparent"
          delay={100}
        >
          <SectionLabel>Dev Environment</SectionLabel>
          <div className="flex flex-wrap gap-2 mt-2">
            {tools.map((t) => (
              <SkillTag key={t.name} {...t} />
            ))}
          </div>
        </BentoCard>

        {/* ── Stats card ── */}
        <BentoCard
          className="md:col-span-7 bg-gradient-to-br from-red-950/20 via-transparent to-transparent overflow-hidden relative"
          delay={200}
        >
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-700/10 rounded-full blur-2xl pointer-events-none" />
          <SectionLabel>At a Glance</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            {[
              { value: "3+", label: "Years Experience" },
              { value: "19+", label: "Technologies" },
              { value: "3", label: "Work Experience" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <span className="text-3xl font-poppins font-bold bg-gradient-to-b from-red-400 to-red-700 text-transparent bg-clip-text">
                  {value}
                </span>
                <span className="text-white/50 text-xs font-poppins mt-1 leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
};

export default Skills;
