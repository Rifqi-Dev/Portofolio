import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import bookChapters from "./bookChapters";
import { useBook } from "./BookContext";
import useIsMobile from "./useIsMobile";
import { BOOK_FIT_EVENT } from "./BookFit";
import usePrefersReducedMotion from "./usePrefersReducedMotion";
import { OVERVIEW_ID, mobileSectionIds } from "./BookMobileScroll";

const toRoman = (n) => ["I", "II", "III", "IV", "V", "VI"][n] || `${n + 1}`;

const GAP = 20; // px between the frame's right edge and the tabs
const TAB_WIDTH = 36; // matches md:w-9 (9 * 4px)
const EDGE_MARGIN = 8; // never sit closer than this to the viewport edge

// Page-mark tabs protruding from the book's right edge, always on screen
// (fixed to the viewport, not the scrolling frame) — quick navigation
// between the cover and any chapter, echoing a physical book's tabbed
// bookmarks.
//
// Positioned relative to the actual book frame (via `frameRef`, measured
// with ResizeObserver + a resize listener) rather than a flat distance
// from the viewport edge — at wide viewports the frame caps out at
// max-w-5xl well before the viewport does, and a viewport-edge-pinned
// strip of tabs would sit far off to the right with a lot of empty space
// between it and the book, making the book itself look off-center even
// though it's mathematically centered on the page.
const BookPageMarks = ({ frameRef }) => {
  const { activeChapter, openChapter, closeBook } = useBook();
  const [left, setLeft] = useState(null);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const [activeSection, setActiveSection] = useState(OVERVIEW_ID);

  // Mobile scroll-spy: the active tab is the last section whose top has
  // scrolled above 40% of the viewport height.
  useEffect(() => {
    if (!isMobile) return undefined;
    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = OVERVIEW_ID;
      mobileSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      setActiveSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isMobile]);

  const scrollToSection = (id) => {
    const behavior = reduced ? "auto" : "smooth";
    if (id === OVERVIEW_ID) window.scrollTo({ top: 0, behavior });
    else document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  };

  useEffect(() => {
    const el = frameRef?.current;
    if (!el) return undefined;

    const recompute = () => {
      const rect = el.getBoundingClientRect();
      const max = window.innerWidth - TAB_WIDTH - EDGE_MARGIN;
      setLeft(Math.min(rect.right + GAP, max));
    };

    recompute();
    window.addEventListener("resize", recompute);
    // BookFit scales the book (a transform, which ResizeObserver can't see).
    window.addEventListener(BOOK_FIT_EVENT, recompute);
    const ro = new ResizeObserver(recompute);
    ro.observe(el);

    return () => {
      window.removeEventListener("resize", recompute);
      window.removeEventListener(BOOK_FIT_EVENT, recompute);
      ro.disconnect();
    };
  }, [frameRef]);

  // Portrait phones have no room beside the frame, so the tabs become a
  // bottom bar: cover + one icon/label per chapter.
  if (isMobile) {
    const tabClass = (active) =>
      `flex flex-col items-center justify-center gap-0.5 flex-1 min-h-[44px] py-1 transition-colors duration-300 ${
        active ? "text-archive-gold" : "text-archive-muted"
      }`;
    return (
      <nav
        aria-label="Chapters"
        className="fixed bottom-0 inset-x-0 z-40 flex h-[calc(4rem+env(safe-area-inset-bottom))] bg-space-blue/95 border-t border-archive-gold/30 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      >
        <button
          type="button"
          onClick={() => scrollToSection(OVERVIEW_ID)}
          className={tabClass(activeSection === OVERVIEW_ID)}
        >
          <FontAwesomeIcon icon={faBookOpen} className="text-base" />
          <span className="font-inter text-[10px]">Overview</span>
        </button>
        {bookChapters.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            onClick={() => scrollToSection(chapter.id)}
            className={tabClass(activeSection === chapter.id)}
          >
            <img
              src={chapter.icon}
              alt=""
              className={`w-5 h-5 object-contain ${
                activeSection === chapter.id ? "" : "opacity-60"
              }`}
            />
            <span className="font-inter text-[10px]">{chapter.title.split(" ")[0]}</span>
          </button>
        ))}
      </nav>
    );
  }

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 transition-[left] duration-200"
      style={{ left: left === null ? undefined : `${left}px`, right: left === null ? "4px" : undefined }}
    >
      <button
        type="button"
        onClick={closeBook}
        aria-label="Overview"
        title="Overview"
        className={`flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border transition-all duration-300 ${
          !activeChapter
            ? "bg-archive-gold text-space border-archive-gold shadow-[0_0_12px_rgba(201,184,138,0.6)]"
            : "bg-space-blue/80 text-archive-muted border-archive-gold/30 hover:text-archive-gold hover:border-archive-gold/60"
        }`}
      >
        <FontAwesomeIcon icon={faBookOpen} className="text-xs" />
      </button>

      {bookChapters.map((chapter, i) => {
        const active = activeChapter === chapter.id;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => openChapter(chapter.id)}
            aria-label={chapter.title}
            title={chapter.title}
            className={`flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border font-cormorant text-sm transition-all duration-300 ${
              active
                ? "bg-archive-gold text-space border-archive-gold shadow-[0_0_12px_rgba(201,184,138,0.6)]"
                : "bg-space-blue/80 text-archive-muted border-archive-gold/30 hover:text-archive-gold hover:border-archive-gold/60"
            }`}
          >
            {toRoman(i)}
          </button>
        );
      })}
    </div>
  );
};

export default BookPageMarks;
