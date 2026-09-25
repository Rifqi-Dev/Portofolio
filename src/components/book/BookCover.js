import React, { useEffect, useState } from "react";
import NeonContainer from "../Neon-container";
import BookChapterList from "./BookChapterList";
import TypeText from "./TypeText";
import linkedinIcon from "./assets/icons/linkedin.png";
import githubIcon from "./assets/icons/github.png";
import mailIcon from "./assets/icons/mail.png";
import instagramIcon from "./assets/icons/instagram.png";

// Social icon buttons: neon outline tile; smaller (icon + padding) on mobile.
const SOCIAL_CLASS =
  "p-1.5 md:p-2 rounded-xl bg-white/[0.06] md:bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)] hover:border-archive-glow hover:shadow-[0_0_16px_rgba(96,140,255,0.55),inset_0_0_10px_rgba(96,140,255,0.3)] hover:scale-105 transition-all duration-300";
const SOCIAL_IMG_CLASS = "w-8 h-8 md:w-9 md:h-9";

// Timed fade-up for the avatar and social buttons. Not AOS: AOS reveals an
// element only once its (unscaled) layout position is inside the viewport,
// so on a short landscape screen — where BookFit scales the book down — the
// buttons sat "below the fold" forever and stayed invisible.
const fadeUp = (visible, delayMs) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(40px)",
  transition: `opacity 1.2s ease ${delayMs}ms, transform 1.2s ease ${delayMs}ms`,
});

// The book's closed cover: title-page content (migrated from the old Hero
// section) on the left, the chapter list on the right — this is what
// visitors land on before "opening" a chapter.
const BookCover = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative w-full grid md:grid-cols-2 gap-10 md:gap-8 items-center px-8 md:px-16 py-10 md:py-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Left page — title / intro */}
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="relative" style={fadeUp(visible, 0)}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-archive-glow to-archive-gold opacity-40 blur-md scale-110" />
          <div className="relative rounded-full p-1 bg-gradient-to-br from-archive-gold via-archive-glow/60 to-archive-gold">
            <div className="rounded-full overflow-hidden bg-space-blue w-28 h-28 lg:w-36 lg:h-36">
              <img
                className="w-full h-full object-cover object-top"
                src="https://storage.kapuyuaxdev.my.id/personal-website/avatar.png"
                alt="Rifqi Firlian Pratama"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <p className="text-archive-gold text-xs font-inter tracking-[0.3em] uppercase">
          <TypeText text="Hello World" speed={45} />
        </p>
        {/* One line. Measured: the name is ~12px wide per 1px of Cinzel semibold
            font size, so it needs (available width / 12): 30px fits the desktop
            book's 392px column (the book is always laid out at 1024px), and on
            phones the size follows the viewport (100vw minus section + cover
            padding), capped at 30px. */}
        <h1 className="whitespace-nowrap text-[min(30px,calc((100vw_-_104px)/12.4))] md:text-[30px] font-cinzel font-semibold text-archive-text leading-tight">
          <TypeText text="I'm Rifqi Firlian Pratama" speed={35} startDelay={300} />
        </h1>
        <div className="flex items-center gap-2">
          <span className="w-8 h-px bg-archive-gold" />
          <h2 className="text-base lg:text-lg font-cormorant text-archive-muted">
            <TypeText text="Software & AI Engineer" speed={35} startDelay={1100} />
          </h2>
          <span className="w-8 h-px bg-archive-gold" />
        </div>
        <p className="text-archive-muted font-inter text-sm max-w-md leading-relaxed">
          <TypeText
            text="Passionate about building intelligent systems and elegant web experiences. Specializing in computer vision, full-stack development, and AI-driven solutions."
            speed={12}
            startDelay={1700}
          />
        </p>

        <div className="flex items-center gap-3 mt-1" style={fadeUp(visible, 200)}>
          <NeonContainer
            url="https://www.linkedin.com/in/rifqi-firlian/"
            img={linkedinIcon}
            alt="LinkedIn"
            className={SOCIAL_CLASS}
            imgClassName={SOCIAL_IMG_CLASS}
          />
          <NeonContainer
            url="https://github.com/rifqi-dev"
            img={githubIcon}
            alt="GitHub"
            className={SOCIAL_CLASS}
            imgClassName={SOCIAL_IMG_CLASS}
          />
          <NeonContainer
            url="mailto:firlianrifqi22@gmail.com"
            img={mailIcon}
            alt="Email"
            className={SOCIAL_CLASS}
            imgClassName={SOCIAL_IMG_CLASS}
          />
          <NeonContainer
            url="https://instagram.com/rifqi.firlian"
            img={instagramIcon}
            alt="Instagram"
            className={SOCIAL_CLASS}
            imgClassName={SOCIAL_IMG_CLASS}
          />
        </div>
      </div>

      {/* Right page — chapters. Hidden on mobile: the bottom tab bar
          (BookPageMarks) already lists the chapters. */}
      <div className="hidden md:flex flex-col items-center gap-5">
        <BookChapterList />
      </div>
    </div>
  );
};

export default BookCover;
