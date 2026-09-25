import React, { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import usePrefersReducedMotion from "./usePrefersReducedMotion";
import BookFade from "./BookFade";

// Wraps content that should "flip like a page" whenever `flipKey`
// changes — used for paging through a chapter's sub-items. `origin`
// identifies which page of the spread this is ("left"/"right"); the
// hinge is always the *spine* (the book's center), not the page's own
// same-named edge — a left page's spine is its right edge, a right
// page's spine is its left edge, matching how a real book's pages
// pivot from the center while their outer edges swing free.
//
// The pivot is pushed half a gap-width past each column's own edge
// (`calc(100% + <halfGap>)` / `calc(0% - <halfGap>)`), not flush with
// it — BookPage.js's two-column grid has a `gap-8` (2rem) track between
// the columns, so each column's own edge sits 1rem short of the
// container's true visual center line; extending it by `halfGap` lands
// the hinge exactly on the shared center line. `halfGap` must be kept in
// sync with BookPage.js's grid gap if that ever changes.
//
// The rotateY swing is paired with an opacity fade (delegated to
// `BookFade`, its own spring, wrapping `children` inside this component's
// rotateY transform) so the page reads as fading in as it turns.
//
// `h-full` here (and on BookFade's own wrapper) matters: this
// `animated.div` is the direct child of BookPage.js's grid cell, which
// stretches to the grid's fixed `minmax(480px,auto)` row height. Without
// `h-full` cascading down to the actual page content div (which relies
// on `h-full` + `flex flex-col` + `mt-auto` to pin its Back/Next button
// to the bottom), each wrapper shrinks to its content and Back/Next drift
// between pages.
const halfGap = "1rem"; // half of BookPage.js's `gap-8` (2rem)
const BookFlip = ({ flipKey, origin = "left", children }) => {
  const reduced = usePrefersReducedMotion();
  const [style, api] = useSpring(() => ({ ry: 0 }));

  useEffect(() => {
    api.start({
      from: { ry: reduced ? 0 : origin === "left" ? -70 : 70 },
      to: { ry: 0 },
      config: { tension: 210, friction: 24 },
    });
    // Replays the flip whenever `flipKey` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipKey]);

  return (
    <animated.div
      className="h-full"
      style={{
        transform: style.ry.to((v) => `rotateY(${v}deg)`),
        transformOrigin:
          origin === "left"
            ? `calc(100% + ${halfGap}) center`
            : `calc(0% - ${halfGap}) center`,
      }}
    >
      <BookFade fadeKey={flipKey}>{children}</BookFade>
    </animated.div>
  );
};

export default BookFlip;
