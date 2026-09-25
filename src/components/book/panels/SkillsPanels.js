import React from "react";
import javascriptIcon from "../assets/icons/javascript.png";
import typescriptIcon from "../assets/icons/typescript.png";
import reactIcon from "../assets/icons/react.png";
import angularIcon from "../assets/icons/angular.png";
import nodejsIcon from "../assets/icons/nodejs.png";
import expressIcon from "../assets/icons/express.png";
import pythonIcon from "../assets/icons/python.png";
import opencvIcon from "../assets/icons/opencv.png";
import postgresqlIcon from "../assets/icons/postgresql.png";
import mongodbIcon from "../assets/icons/mongodb.png";
import dockerIcon from "../assets/icons/docker.png";
import tailwindIcon from "../assets/icons/tailwind.png";
import css3Icon from "../assets/icons/css3.png";
import gitIcon from "../assets/icons/git.png";
import restApiIcon from "../assets/icons/rest-api.png";
import computerVisionIcon from "../assets/icons/computer-vision.png";
import ffmpegIcon from "../assets/icons/ffmpeg.png";
import jiraIcon from "../assets/icons/jira.png";
import bunIcon from "../assets/icons/bun.png";
import vscodeIcon from "../assets/icons/vscode.png";
import linuxIcon from "../assets/icons/linux.png";
import postmanIcon from "../assets/icons/postman.png";
import anacondaIcon from "../assets/icons/anaconda.png";
import labelmeIcon from "../assets/icons/labelme.png";
import cvatIcon from "../assets/icons/cvat.png";

// Neon line-art icon set (one transparent PNG per entry, cut from a single
// generated sheet) � replaces the earlier mix of FontAwesome/Devicon icons.
const hardSkills = [
  { name: "JavaScript", img: javascriptIcon },
  { name: "TypeScript", img: typescriptIcon },
  { name: "React", img: reactIcon },
  { name: "Angular", img: angularIcon },
  { name: "Node.js", img: nodejsIcon },
  { name: "Express.js", img: expressIcon },
  { name: "Python", img: pythonIcon },
  { name: "OpenCV", img: opencvIcon },
  { name: "PostgreSQL", img: postgresqlIcon },
  { name: "MongoDB", img: mongodbIcon },
  { name: "Docker", img: dockerIcon },
  { name: "Tailwind CSS", img: tailwindIcon },
  { name: "CSS3", img: css3Icon },
  { name: "Git", img: gitIcon },
  { name: "REST APIs", img: restApiIcon },
  { name: "Computer Vision", img: computerVisionIcon },
  { name: "FFmpeg", img: ffmpegIcon },
  { name: "JIRA", img: jiraIcon },
  { name: "Bun", img: bunIcon },
];

const tools = [
  { name: "VS Code", img: vscodeIcon },
  { name: "Linux", img: linuxIcon },
  { name: "Postman", img: postmanIcon },
  { name: "Anaconda", img: anacondaIcon },
  { name: "LabelMe", img: labelmeIcon },
  { name: "CVAT", img: cvatIcon },
];

const SkillTag = ({ name, img }) => (
  <div className="inline-flex items-center gap-1.5 pl-1 pr-3.5 py-0.5 rounded-xl bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)] hover:border-archive-glow hover:shadow-[0_0_16px_rgba(96,140,255,0.55),inset_0_0_10px_rgba(96,140,255,0.3)] hover:scale-105 transition-all duration-300 cursor-default">
    <img
      src={img}
      alt=""
      className="w-8 h-8 object-contain flex-shrink-0"
      loading="lazy"
    />
    <span className="text-archive-text text-xs font-inter whitespace-nowrap">
      {name}
    </span>
  </div>
);

export const TechStackPanel = () => (
  <div className="flex flex-wrap gap-2">
    {hardSkills.map((s) => (
      <SkillTag key={s.name} {...s} />
    ))}
  </div>
);

export const DevEnvironmentPanel = () => (
  <div className="flex flex-wrap gap-2">
    {tools.map((t) => (
      <SkillTag key={t.name} {...t} />
    ))}
  </div>
);

// Mobile bento version: a 4-up grid of icon-over-name cells instead of the
// desktop's wrapping tag pills (used by BookBentoPage).
const SkillCell = ({ name, img }) => (
  <div className="flex flex-col items-center justify-center gap-0.5 px-0.5 py-1 rounded-lg bg-white/[0.06] border border-archive-glow/40 shadow-[0_0_6px_rgba(96,140,255,0.25)] text-center">
    <img src={img} alt="" className="w-7 h-7 object-contain" loading="lazy" />
    <span className="text-archive-text text-[10px] font-inter leading-tight">{name}</span>
  </div>
);

// Inline style, not a `grid-cols-*` class: tailwind.config.js overrides
// gridTemplateColumns (only 2/3 exist), so a missing class silently
// collapses this to a single column.
const SkillGrid = ({ items }) => (
  <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
    {items.map((s) => (
      <SkillCell key={s.name} {...s} />
    ))}
  </div>
);

export const TechStackBento = () => <SkillGrid items={hardSkills} />;
export const DevEnvironmentBento = () => <SkillGrid items={tools} />;
