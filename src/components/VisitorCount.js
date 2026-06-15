import React, { useEffect, useState } from "react";
import { fetchAnalytic } from "../service/analyticService";
import { useSpring, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarDay,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

function AnimatedNumber({ num }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: num,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
}

const StatCard = ({ icon, label, value, accent }) => (
  <div className="relative overflow-hidden flex flex-col items-center text-center gap-3 px-5 py-5 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/30 transition-all duration-300">
    <span
      className="absolute top-0 left-0 h-[2px] w-full"
      style={{
        background: `linear-gradient(90deg, ${accent}00, ${accent}, ${accent}00)`,
      }}
    />
    {/* <div
      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: accent + "22", border: `1px solid ${accent}44` }}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ color: accent }}
        className="text-base"
      />
    </div> */}
    <div className="flex flex-col min-w-0 items-center">
      <span className="text-white/40 text-xs font-poppins uppercase tracking-[0.2em] leading-none mb-1">
        {label}
      </span>
      <span className="text-white font-poppins font-bold text-4xl leading-none mt-5">
        <AnimatedNumber num={value} />
      </span>
    </div>
  </div>
);

function VisitorCount() {
  const [, setLoading] = useState(true);
  const [visitData, setVisitData] = useState({
    date: "",
    count: 0,
    last_thirty_day: 0,
  });

  useEffect(() => {
    const fetchWebAnalytic = async () => {
      setLoading(true);
      await fetchAnalytic()
        .then((response) => {
          setLoading(false);
          setVisitData(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchWebAnalytic();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto font-poppins">
      {/* <div className="flex items-center gap-3 mb-4">
        <FontAwesomeIcon icon={faUsers} className="text-red-400 text-sm" />
        <span className="text-white/40 text-xs uppercase tracking-[0.2em] font-poppins">
          Visitor Statistics
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          icon={faCalendarDay}
          label="Today"
          value={visitData.count}
          accent="#ef4444"
        />
        <StatCard
          icon={faCalendar}
          label="Last 30 Days"
          value={visitData.last_thirty_day}
          accent="#f97316"
        />
      </div>
    </div>
  );
}

export default VisitorCount;
