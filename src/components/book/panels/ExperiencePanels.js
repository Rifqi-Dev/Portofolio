import React, { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../usePrefersReducedMotion";

export const experiences = [
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

// Left page of an experience spread — role/period/description. The
// company name always renders here, inside the card — the outer page
// heading (BookPage.js's "Chapter N / label") hides its own label text
// for these entries instead of duplicating it (see `hideLeftLabel` in
// bookChapters.js), rather than this card hiding its own heading.
export const ExperienceDetailsPanel = ({ index }) => {
  const exp = experiences[index];
  if (!exp) return null;

  return (
    <div className="bg-white/[0.06] md:bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)] rounded-xl p-6">
      <div className="mb-3">
        <div>
          <h4 className="font-cormorant font-bold text-lg text-archive-text">
            {exp.company}
          </h4>
          <p className="text-archive-gold font-inter text-sm font-semibold  mb-1">
            {exp.role}
          </p>
        </div>
        <div className="text-left">
          <p className="text-archive-text/70 text-sm font-inter">
            {exp.period}
          </p>
          <p className="text-archive-muted text-xs font-inter">{exp.type}</p>
        </div>
      </div>
      <p className="text-archive-text/80 text-sm font-inter leading-relaxed">
        {exp.description}
      </p>
    </div>
  );
};

// Ferris-wheel motion: each card is a gondola hanging from a wheel. Its
// distance from the track's centre (in card widths) puts it at an angle on
// the wheel: it dips along the arc (`R * (1 - cos)`), swings a little
// against the direction of travel (pivoting from its top edge) and
// recedes (scale/opacity), while staying upright like a real gondola.
const WHEEL_RADIUS = 150; // px
const WHEEL_ANGLE = 0.9; // radians per card of offset
const SWING_DEG = 5; // pendulum swing per card of offset

// The track must be `position: relative` so each card's `offsetLeft` is
// measured from the track, not from some outer positioned ancestor —
// otherwise every card is off-centre by the track's own inset and rests
// tilted/dropped instead of flat.
const applyWheel = (track) => {
  const centre = track.scrollLeft + track.clientWidth / 2;
  Array.from(track.children).forEach((slide) => {
    // Transform the inner wheel element, not the slide itself: scroll-snap
    // uses a snap area's *transformed* box, so transforming the slide moved
    // its snap point (the card settled ~15px off and got clipped at the
    // track's edge). The slide stays untransformed and owns the snapping.
    const card = slide.firstElementChild;
    const step = slide.offsetWidth + 12; // card + gap-3
    const offset = (slide.offsetLeft + slide.offsetWidth / 2 - centre) / step;
    const clamped = Math.max(-1.6, Math.min(1.6, offset));
    const drop = WHEEL_RADIUS * (1 - Math.cos(clamped * WHEEL_ANGLE));
    const scale = 1 - Math.min(Math.abs(offset), 1) * 0.1;
    card.style.transform = `translateY(${drop}px) rotate(${-clamped * SWING_DEG}deg) scale(${scale})`;
    card.style.opacity = String(1 - Math.min(Math.abs(offset), 1) * 0.45);
  });
};

// Mobile bento: the roles as a horizontal swipe carousel (CSS scroll-snap,
// no library) with dot indicators that track and control the scroll, and
// the Ferris-wheel motion above (skipped for reduced motion).
export const ExperienceCarousel = () => {
  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!reduced) applyWheel(trackRef.current);
    return () => cancelAnimationFrame(frameRef.current);
  }, [reduced]);

  const cardStep = () => {
    const track = trackRef.current;
    const first = track.children[0];
    const second = track.children[1];
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  };

  const onScroll = () => {
    const track = trackRef.current;
    setActive(Math.round(track.scrollLeft / cardStep()));
    // Horizontal-only: the dipping neighbour cards add vertical overflow,
    // which `overflow-y-hidden` stops the user scrolling but not the browser
    // (focus, scrollIntoView) — snap any drift back.
    if (track.scrollTop) track.scrollTop = 0;
    if (reduced) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => applyWheel(track));
  };

  const goTo = (i) =>
    trackRef.current.scrollTo({ left: i * cardStep(), behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="relative flex gap-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {experiences.map((exp, i) => (
          <div key={exp.company} className="min-w-full snap-start [&>div]:h-full">
            <div className="origin-top will-change-transform [&>div]:h-full">
              <ExperienceDetailsPanel index={i} />
            </div>
          </div>
        ))}
      </div>
      {/* Pinned to the bottom of the carousel (inside the track's bottom
          padding, which is also where the wheel dip plays), so the dots
          stay put while the cards swing and add no height of their own. */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center gap-2">
        {experiences.map((exp, i) => (
          <button
            key={exp.company}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${exp.company}`}
            className="p-1.5"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-archive-gold" : "w-2 bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
