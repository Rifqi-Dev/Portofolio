import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useIsLandscapeShort from "./useIsLandscapeShort";

export const BOOK_FIT_EVENT = "bookfit";
export const STAGE_WIDTH = 1024; // BookFrame's max-w-5xl, the width the book is designed at
const SIDE_GUTTER = 64; // each side: 20 gap + 36 tab + 8 margin for the page-mark tabs (App.js md:px-16)
const HEIGHT_MARGIN = 16; // breathing room above/below when fitting the height
const BASE_HEIGHT = (STAGE_WIDTH * 2) / 3; // the frame's 3:2 box at its designed width
const FILL_HEIGHT = 0.75; // on big screens the book grows to about this share of the viewport height
const MAX_SCALE = 2.5;

// Scale that fits a book of `naturalHeight` (at STAGE_WIDTH wide) on screen:
// always by width (so the content and the frame art shrink together on narrow
// desktops instead of the content crowding a smaller frame), and by height too
// on a short landscape viewport (a sideways phone). On tall screens (2K/4K) it
// also scales *up* so the book doesn't look tiny; that ceiling comes from the
// fixed BASE_HEIGHT, not `naturalHeight`, so the book keeps one size while
// taller chapter pages come and go.
export const fitScale = (naturalHeight, { fitHeight = false } = {}) =>
  Math.min(
    MAX_SCALE,
    Math.max(1, (window.innerHeight * FILL_HEIGHT) / BASE_HEIGHT),
    (window.innerWidth - 2 * SIDE_GUTTER) / STAGE_WIDTH,
    fitHeight ? (window.innerHeight - HEIGHT_MARGIN) / naturalHeight : Infinity,
  );

// Lays the (desktop) book out at its full designed width (1024px) and scales
// it down with `transform: scale` when the screen is narrower — and, on a
// short landscape viewport, also shorter — so every page's content keeps its
// proportions to the frame art. At >= ~1152px wide the scale is 1 and this is
// effectively a pass-through.
//
// `transform: scale` doesn't change layout size, so an outer box is sized to
// the *scaled* dimensions. The stage's own natural height (offsetHeight,
// unaffected by transforms) is re-measured whenever the content resizes, e.g.
// when a chapter page is taller than the 3:2 minimum.
const BookFit = ({ children }) => {
  const landscapeShort = useIsLandscapeShort();
  const stageRef = useRef(null);
  const [fit, setFit] = useState(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const measure = () => {
      const scale = fitScale(stage.offsetHeight, { fitHeight: landscapeShort });
      const next = { scale, width: STAGE_WIDTH * scale, height: stage.offsetHeight * scale };
      setFit((prev) =>
        prev && prev.scale === next.scale && prev.height === next.height ? prev : next,
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    window.addEventListener("resize", measure);
    // The first measurement can run before web fonts / images settle the
    // book's height; re-measure once they have (ResizeObserver covers the
    // rest, but isn't delivered while the page is hidden).
    document.fonts?.ready.then(measure);
    const settle = setTimeout(measure, 400);
    return () => {
      clearTimeout(settle);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [landscapeShort]);

  // After the scaled layout is committed, tell the page-mark tabs (which hug
  // the frame's on-screen edge) that the frame moved. A dedicated event, not
  // `resize`: this component listens to `resize` itself, so re-dispatching it
  // would loop forever.
  useEffect(() => {
    window.dispatchEvent(new Event(BOOK_FIT_EVENT));
  }, [fit]);

  return (
    <div style={fit ? { width: fit.width, height: fit.height } : undefined}>
      <div
        ref={stageRef}
        style={{
          width: STAGE_WIDTH,
          transform: fit ? `scale(${fit.scale})` : undefined,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BookFit;
