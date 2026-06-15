import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NeonContainer from "./Neon-container";
import VisitorCount from "./VisitorCount";
import DecryptedText from "./reactbits/DecryptedText";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200 });
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center z-10"
    >
      {/* Main content */}
      <div
        className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center gap-12 pt-24 pb-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Avatar + Text row */}
        <div
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full"
          data-aos="fade-up"
        >
          {/* Avatar */}
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-900 opacity-60 blur-md scale-110" />
              {/* Ring border */}
              <div className="relative rounded-full p-1 bg-gradient-to-br from-red-400 via-red-700 to-red-900">
                <div className="rounded-full overflow-hidden bg-black w-44 h-44 lg:w-56 lg:h-56">
                  <img
                    className="w-full h-full object-cover object-top"
                    src="https://storage.kapuyuaxdev.my.id/personal-website/avatar.png"
                    alt="Rifqi Firlian Pratama"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <p className="text-red-400 text-sm font-poppins tracking-[0.3em] uppercase font-mono">
              <DecryptedText
                text="Hello World"
                animateOn="view"
                sequential
                speed={60}
                className="text-red-400"
                encryptedClassName="text-red-600/70"
              />
            </p>
            <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-white leading-tight font-mono">
              <DecryptedText
                text="I'm Rifqi Firlian Pratama"
                animateOn="view"
                sequential
                speed={40}
                className="text-white"
                encryptedClassName="text-red-500/60"
              />
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-red-500" />
              <h2 className="text-lg lg:text-xl font-poppins font-mono text-white/80">
                <DecryptedText
                  text="Software & AI Engineer"
                  animateOn="view"
                  sequential
                  speed={45}
                  className="text-white/80"
                  encryptedClassName="text-red-400/50"
                />
              </h2>
              <span className="w-8 h-px bg-red-500" />
            </div>
            <p className="text-white/60 font-poppins text-sm max-w-md leading-relaxed font-mono">
              <DecryptedText
                text="Passionate about building intelligent systems and elegant web experiences. Specializing in computer vision, full-stack development, and AI-driven solutions."
                animateOn="view"
                sequential
                speed={18}
                className="text-white/60"
                encryptedClassName="text-red-500/40"
              />
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-2">
              <NeonContainer
                url="https://www.linkedin.com/in/rifqi-firlian/"
                icon={faLinkedin}
                className="p-3 rounded-lg border border-white/20 bg-white/5 hover:border-sky-400 hover:bg-sky-400/10 hover:text-sky-400 transition-all duration-300"
              />
              <NeonContainer
                url="https://github.com/rifqi-dev"
                icon={faGithub}
                className="p-3 rounded-lg border border-white/20 bg-white/5 hover:border-purple-400 hover:bg-purple-400/10 hover:text-purple-400 transition-all duration-300"
              />
              <NeonContainer
                url="mailto:firlianrifqi22@gmail.com"
                icon={faEnvelope}
                className="p-3 rounded-lg border border-white/20 bg-white/5 hover:border-green-400 hover:bg-green-400/10 hover:text-green-400 transition-all duration-300"
              />
              <NeonContainer
                url="https://instagram.com/rifqi.firlian"
                icon={faInstagram}
                className="p-3 rounded-lg border border-white/20 bg-white/5 hover:border-red-400 hover:bg-red-400/10 hover:text-red-400 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full flex items-center gap-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-white/30 text-xs font-poppins tracking-widest uppercase">
            visitor stats
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Visitor count */}
        <div className="w-full" data-aos="fade-up" data-aos-delay="300">
          <VisitorCount />
        </div>
      </div>
    </section>
  );
};

export default Hero;
