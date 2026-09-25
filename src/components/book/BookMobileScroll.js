import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import bookChapters from "./bookChapters";
import BookCover from "./BookCover";
import BookBentoPage from "./BookBentoPage";

// Section ids the mobile bottom nav scrolls to (see BookPageMarks.js).
export const OVERVIEW_ID = "overview";
export const mobileSectionIds = [OVERVIEW_ID, ...bookChapters.map((c) => c.id)];

const SCROLL_DISMISS_PX = 24;

// "Swipe to see potential" prompt on the Overview (plain text + chevron, no
// container; a soft text-shadow keeps it legible over the sections behind it). Fades out for good the
// first time the visitor scrolls (a swipe up is a scroll), then unmounts.
const SwipeHint = () => {
  const [dismissed, setDismissed] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const check = () => {
      if (window.scrollY > SCROLL_DISMISS_PX) setDismissed(true);
    };
    check(); // e.g. the browser restored a scrolled position on reload
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden={dismissed}
      onTransitionEnd={() => dismissed && setGone(true)}
      className={`fixed inset-x-0 bottom-20 z-30 flex justify-center pointer-events-none transition-opacity duration-500 ${
        dismissed ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-1">
        <FontAwesomeIcon
          icon={faChevronUp}
          className="text-archive-gold text-xs motion-safe:animate-bounce"
        />
        <span className="font-inter text-archive-text text-xs tracking-[0.2em] uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
          Swipe to see potential
        </span>
      </div>
    </div>
  );
};

// One section = one screen: the visible height (dynamic viewport minus the
// 4rem bottom tab bar and its safe-area inset, see BookPageMarks.js and the
// matching bottom padding in Book.js). The section is the scroll target and
// snap point (`snap-always`: one swipe = one section); the glass container fills it, inset 1rem on every side. Content
// taller than a screen (very small phones) grows the section instead of
// being clipped.
const SCREEN = "min-h-[calc(100dvh-4rem-env(safe-area-inset-bottom))] p-4 flex snap-start snap-always";
const CONTAINER =
  "w-full rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] flex flex-col justify-start";

// Mobile layout: the whole site is one scrolling page — the overview, then
// each chapter's bento grid, every one a full-screen section with its own
// container. The bottom nav scrolls to these sections instead of swapping
// chapters; a swipe snaps to the next section top and
// `snap-always` stops a fast fling from skipping past it.
const BookMobileScroll = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollSnapType = "y mandatory";
    return () => {
      root.style.scrollSnapType = "";
    };
  }, []);

  return (
    <div className="w-full">
      <section id={OVERVIEW_ID} className={SCREEN}>
        {/* `self-center`: the overview container hugs its content (centred in
            the screen) instead of stretching to fill it like the chapters. */}
        <div className={`${CONTAINER} self-center`}>
          <BookCover />
        </div>
      </section>
      {bookChapters.map((chapter) => (
        <section key={chapter.id} id={chapter.id} className={SCREEN}>
          <div className={`${CONTAINER} ${chapter.fillScreen ? "self-stretch" : "self-start"}`}>
            <BookBentoPage chapter={chapter} />
          </div>
        </section>
      ))}
      <SwipeHint />
    </div>
  );
};

export default BookMobileScroll;
