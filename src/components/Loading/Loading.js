import React, { useEffect, useState } from "react";

const S = "#d1d5db"; // main stroke
const SD = "#6b7280"; // secondary/distant smoke stroke

const star4 = (cx, cy, r) =>
  `M${cx} ${cy - r} L${cx + r * 0.22} ${cy - r * 0.22} L${cx + r} ${cy} ` +
  `L${cx + r * 0.22} ${cy + r * 0.22} L${cx} ${cy + r} ` +
  `L${cx - r * 0.22} ${cy + r * 0.22} L${cx - r} ${cy} ` +
  `L${cx - r * 0.22} ${cy - r * 0.22} Z`;

const RocketSVG = () => (
  <svg width="84" height="130" viewBox="0 0 84 130" fill="none">
    <style>{`
      @keyframes rf {
        0%,100% { transform: scaleY(1); }
        50%      { transform: scaleY(1.2); }
      }
      .rf { transform-box: fill-box; transform-origin: center top; animation: rf 0.28s ease-in-out infinite; }
    `}</style>

    {/* Nose cone */}
    <path
      d="M42 4 C30 4 22 22 20 44 L64 44 C62 22 54 4 42 4 Z"
      stroke={S}
      strokeWidth="2.5"
      fill="#111"
      strokeLinejoin="round"
    />
    {/* Body */}
    <rect
      x="20"
      y="44"
      width="44"
      height="40"
      rx="2"
      stroke={S}
      strokeWidth="2.5"
      fill="#111"
    />
    {/* Porthole outer */}
    <circle cx="42" cy="60" r="10" stroke={S} strokeWidth="2.5" fill="#111" />
    {/* Porthole inner dashed */}
    <circle
      cx="42"
      cy="60"
      r="4"
      stroke={S}
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="2.5 2"
    />

    {/* Left fin */}
    <path
      d="M20 62 L4 84 Q4 92 12 92 L20 92 Z"
      stroke={S}
      strokeWidth="2.5"
      fill="#111"
      strokeLinejoin="round"
    />
    {/* Right fin */}
    <path
      d="M64 62 L80 84 Q80 92 72 92 L64 92 Z"
      stroke={S}
      strokeWidth="2.5"
      fill="#111"
      strokeLinejoin="round"
    />

    {/* Nozzle / bottom cap */}
    <path
      d="M28 84 L28 92 Q28 98 34 98 L50 98 Q56 98 56 92 L56 84"
      stroke={S}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Flame */}
    <g className="rf">
      <path
        d="M32 98 Q36 116 42 122 Q48 116 52 98 Z"
        stroke="#f97316"
        strokeWidth="1.5"
        fill="rgba(249,115,22,0.18)"
        strokeLinejoin="round"
      />
      <path
        d="M36 98 Q39 110 42 114 Q45 110 48 98 Z"
        stroke="#fcd34d"
        strokeWidth="1"
        fill="rgba(252,211,77,0.22)"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const SmokeClouds = ({ opacity }) => (
  <div style={{ opacity, transition: "opacity 0.6s ease" }}>
    <svg width="380" height="210" viewBox="0 0 380 210" fill="none">
      <style>{`
        @keyframes cp { 0%,100%{opacity:0.45;} 50%{opacity:0.8;} }
        @keyframes sp {
          0%,100%{ opacity:0.35; transform:scale(0.8); }
          50%    { opacity:0.9;  transform:scale(1.12); }
        }
        .cl { animation: cp 3s ease infinite; }
        .cr { animation: cp 3s ease 0.7s infinite; }
        .cc { animation: cp 2.2s ease 0.2s infinite; }
        .sp  { transform-box: fill-box; transform-origin: center;
               animation: sp 2.2s ease infinite; }
        .sp1 { animation-delay: 0.4s; }
        .sp2 { animation-delay: 0.9s; }
        .sp3 { animation-delay: 1.4s; }
        .sp4 { animation-delay: 1.8s; }
      `}</style>

      {/* ── Sparkles ── */}
      <path
        className="sp"
        d={star4(58, 48, 7)}
        stroke={S}
        strokeWidth="1"
        fill="none"
      />
      <path
        className="sp sp1"
        d={star4(300, 38, 9)}
        stroke={S}
        strokeWidth="1"
        fill="none"
      />
      <path
        className="sp sp2"
        d={star4(18, 138, 5)}
        stroke={SD}
        strokeWidth="1"
        fill="none"
      />
      <path
        className="sp sp3"
        d={star4(355, 128, 6)}
        stroke={SD}
        strokeWidth="1"
        fill="none"
      />
      <path
        className="sp sp4"
        d={star4(190, 10, 5)}
        stroke={S}
        strokeWidth="1"
        fill="none"
      />

      {/* ── Central column ── */}
      <g className="cc">
        <circle cx="190" cy="20" r="13" stroke={S} strokeWidth="1.5" />
        <circle cx="184" cy="46" r="17" stroke={S} strokeWidth="1.5" />
        <circle cx="196" cy="70" r="15" stroke={S} strokeWidth="1.5" />
      </g>

      {/* ── Left cloud mass ── */}
      <g className="cl">
        <circle cx="164" cy="84" r="19" stroke={S} strokeWidth="1.5" />
        <circle cx="134" cy="100" r="25" stroke={S} strokeWidth="1.5" />
        <circle cx="100" cy="118" r="30" stroke={S} strokeWidth="1.5" />
        <circle cx="65" cy="140" r="28" stroke={SD} strokeWidth="1.5" />
        <circle cx="35" cy="162" r="24" stroke={SD} strokeWidth="1.5" />
        <circle cx="70" cy="170" r="20" stroke={SD} strokeWidth="1.4" />
        <circle cx="108" cy="178" r="18" stroke={SD} strokeWidth="1.4" />
        <circle cx="46" cy="148" r="16" stroke={SD} strokeWidth="1.2" />
        <circle cx="82" cy="152" r="14" stroke={SD} strokeWidth="1.2" />
      </g>

      {/* ── Right cloud mass ── */}
      <g className="cr">
        <circle cx="216" cy="84" r="19" stroke={S} strokeWidth="1.5" />
        <circle cx="246" cy="100" r="25" stroke={S} strokeWidth="1.5" />
        <circle cx="280" cy="118" r="30" stroke={S} strokeWidth="1.5" />
        <circle cx="315" cy="140" r="28" stroke={SD} strokeWidth="1.5" />
        <circle cx="345" cy="162" r="24" stroke={SD} strokeWidth="1.5" />
        <circle cx="310" cy="170" r="20" stroke={SD} strokeWidth="1.4" />
        <circle cx="272" cy="178" r="18" stroke={SD} strokeWidth="1.4" />
        <circle cx="334" cy="148" r="16" stroke={SD} strokeWidth="1.2" />
        <circle cx="298" cy="152" r="14" stroke={SD} strokeWidth="1.2" />
      </g>

      {/* ── Bottom spread ── */}
      <g className="cc">
        <circle cx="144" cy="188" r="20" stroke={SD} strokeWidth="1.2" />
        <circle cx="178" cy="198" r="16" stroke={SD} strokeWidth="1.2" />
        <circle cx="190" cy="205" r="12" stroke={SD} strokeWidth="1.2" />
        <circle cx="202" cy="198" r="16" stroke={SD} strokeWidth="1.2" />
        <circle cx="236" cy="188" r="20" stroke={SD} strokeWidth="1.2" />
      </g>
    </svg>
  </div>
);

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1900;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const pct = Math.min(Math.round((current / steps) * 100), 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const rocketRise = Math.round((progress / 100) * 210); // rises 210px total
  const smokeOpacity = Math.min(progress / 45, 1); // fully visible at 45%
  const fadeOut = progress >= 98;

  return (
    <div
      className="flex justify-center items-center h-screen bg-transparent flex-col gap-5"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: fadeOut ? "opacity 0.6s ease" : "none",
      }}
    >
      {/* Launch scene */}
      {/* <div className="relative flex justify-center" style={{ width: "380px", height: "330px" }}> */}

      {/* Smoke — fixed at base */}
      {/* <div className="absolute bottom-0 left-0">
          <SmokeClouds opacity={smokeOpacity} />
        </div> */}

      {/* Rocket — rises */}
      {/* <div
          className="absolute"
          style={{
            bottom: `${80 + rocketRise}px`,
            left: "50%",
            transform: "translateX(-50%)",
            filter: "drop-shadow(0 0 10px rgba(239,68,68,0.45))",
            transition: "bottom 0.04s linear",
          }}
        >
          <RocketSVG />
        </div>
      </div> */}

      {/* Progress bar */}
      <div className="flex flex-col items-center gap-2 w-[260px]">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-red-700 to-red-400 rounded-full"
            style={{
              width: `${progress}%`,
              transition: "width 0.04s linear",
              boxShadow: "0 0 8px rgba(239,68,68,0.7)",
            }}
          />
        </div>
        <span className="text-white/70 font-poppins text-sm tracking-widest">
          {progress}%
        </span>
      </div>
    </div>
  );
}

export default Loading;
