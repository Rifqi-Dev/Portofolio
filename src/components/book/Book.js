import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useBook } from "./BookContext";
import BookFit from "./BookFit";
import BookFrame from "./BookFrame";
import BookCover from "./BookCover";
import BookPage from "./BookPage";
import BookMobileScroll from "./BookMobileScroll";
import BookPageMarks from "./BookPageMarks";
import usePrefersReducedMotion from "./usePrefersReducedMotion";
import useIsMobile from "./useIsMobile";

// Rendered inside a <BookProvider> supplied by App.js.
//
// Only the active view (cover or one chapter) is mounted at a time, in
// normal document flow — this keeps page-level scroll (and therefore AOS,
// which the chapter components already rely on) working exactly as it did
// before the book redesign.
const Book = () => {
  const { activeChapter } = useBook();
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [style, api] = useSpring(() => ({ opacity: 1, ry: 0 }));
  const frameRef = useRef(null);

  useEffect(() => {
    // Reset scroll to the top of the new view — otherwise switching
    // chapters (or back to the cover) while scrolled down keeps the old
    // scroll offset, which both looks jarring and throws off the sticky
    // chapter header's stuck/unstuck math inside BookPage.
    window.scrollTo({ top: 0, behavior: "auto" });
    api.start({
      from: { opacity: 0, ry: reduced ? 0 : -25 },
      to: { opacity: 1, ry: 0 },
      config: { tension: 210, friction: 26 },
    });
    // Replays the "book opening/closing" swing whenever the active
    // chapter changes — intentionally not depending on `api`/`reduced`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChapter]);

  // Mobile: no book frame — each section is its own glass container
  // (BookMobileScroll), with bottom padding to clear the fixed tab bar.
  if (isMobile) {
    return (
      <>
        <div className="w-full pb-[calc(4rem+env(safe-area-inset-bottom))]">
          <BookMobileScroll />
        </div>
        <BookPageMarks />
      </>
    );
  }

  return (
    <>
      <BookFit>
        <BookFrame frameRef={frameRef}>
          <animated.div
            style={{
              opacity: style.opacity,
              transform: style.ry.to((v) => `rotateY(${v}deg)`),
              transformOrigin: "left center",
            }}
          >
            {activeChapter ? <BookPage /> : <BookCover />}
          </animated.div>
        </BookFrame>
      </BookFit>
      <BookPageMarks frameRef={frameRef} />
    </>
  );
};

export default Book;
