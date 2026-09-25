import React from "react";
import bookPageBg from "./assets/book-page-bg.png";

// Shell around the book's content area. The ornate frame is the
// background artwork itself (book-page-bg.png, kept at its native 3:2
// aspect ratio so its own border/corner art isn't stretched or cropped)
// — no extra CSS border/corner overlays on top of it. Grows with its
// content below that image (page-level scroll), rather than clipping to
// a fixed viewport height.
//
// Takes `frameRef` (a plain prop, not React's reserved `ref`) so
// BookPageMarks can measure the frame's actual right edge and hug it,
// instead of floating at a fixed distance from the viewport edge — see
// Book.js for why that matters.
const BookFrame = ({ children, frameRef }) => (
  <div ref={frameRef} className="relative w-full max-w-5xl mx-auto">
    {/* No `overflow-hidden` here: it would clip the image to match this
        div's rounded corners, but CSS also treats any non-`visible`
        `overflow` as a scroll container — which becomes the containing
        block for the `position: sticky` chapter header inside `children`,
        pinning it 64px from THIS div's top instead of the viewport's top
        (since this div itself never scrolls). Round the image's own
        corners instead, so clipping isn't needed. */}
    <div className="relative rounded-2xl bg-space-blue">
      {/* Decorative frame art, pinned to the top at its native 3:2 ratio —
          not stretched to match variable content height below it. */}
      <div
        className="absolute inset-x-0 top-0 aspect-[3/2] rounded-2xl bg-cover bg-top bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bookPageBg})` }}
      />

      {/* Same aspect ratio as the image gives this a matching *minimum*
          height (CSS grows it further if content needs more — see the
          "automatic minimum size" rules for aspect-ratio boxes), so
          shorter content (like the cover) centers vertically inside the
          book instead of sitting flush against the top. */}
      <div
        className="relative aspect-[3/2] flex flex-col justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  </div>
);

export default BookFrame;
