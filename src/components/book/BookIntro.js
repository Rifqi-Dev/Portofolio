import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import introVideo from "./assets/open-book-intro.webm";
import usePrefersReducedMotion from "./usePrefersReducedMotion";
import useIsLandscapeShort from "./useIsLandscapeShort";
import { STAGE_WIDTH, fitScale } from "./BookFit";

// Book-opening intro that replaces the old loading bar. Plays once, then
// calls `onFinish`; App.js then sets `fading` and fades the real book in
// underneath while this overlay dissolves (see the springs below).
//
// The video (1280x720, transparent VP9 WebM, keyed in porto-image, cut at
// source frame 200) ends on an open book measured at x 150-1099 / y 60-667 of
// the frame. These
// offsets scale that book to BookFrame's width and centre it on the frame, so
// the last video frame lands where the real book appears.
const VIDEO_WIDTH = "134.74%"; // of the frame's width
const VIDEO_LEFT = "-15.79%"; // of the frame's width
const VIDEO_TOP = "-7.43%"; // of the frame's height
const BOOK_HEIGHT = (STAGE_WIDTH * 2) / 3; // the frame's 3:2 box at its designed width
const SAFETY_TIMEOUT_MS = 12000; // video is 8.4s (ends at source frame 200); never trap the visitor
export const DISSOLVE_MS = 900; // App.js unmounts the overlay after this

// Safari/iOS decode VP9 but drop the alpha channel (it would show an opaque
// box), so treat them as unsupported and go straight to the book.
const canPlayAlphaWebm = () => {
  const probe = document.createElement("video");
  if (!probe.canPlayType?.('video/webm; codecs="vp9"')) return false;
  const ua = navigator.userAgent;
  const isSafari =
    /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Android|CriOS|FxiOS/.test(ua);
  return !isSafari;
};

// `onFinish`: the video played to the end (or hung past the safety timeout).
// `onUnavailable` (optional, falls back to `onFinish`): the video can't be
// shown — unsupported browser (Safari/iOS), reduced motion, autoplay blocked
// or a decode error — so App.js can show the loading bar instead.
const BookIntro = ({ onFinish, onUnavailable, fading }) => {
  const videoRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  // Decided once: if the intro can't play, render nothing at all (an
  // unplayable/alpha-less video must not flash an opaque frame).
  const [supported] = useState(() => !reduced && canPlayAlphaWebm());
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;
  const unavailableRef = useRef(onUnavailable);
  unavailableRef.current = onUnavailable;

  // The book is laid out at 1024px and scaled to fit (BookFit.js), so the
  // video's book box gets the same fixed size + scale to land on it.
  const landscape = useIsLandscapeShort();
  const [scale, setScale] = useState(() => fitScale(BOOK_HEIGHT, { fitHeight: landscape }));
  useEffect(() => {
    const update = () => setScale(fitScale(BOOK_HEIGHT, { fitHeight: landscape }));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [landscape]);

  // Hand-off: the video book grows slightly, blurs and fades out, as if it
  // dissolves into light, while a glow flares over the book and dies down.
  // The glow hides the jump between the bright last video frame and the
  // darker real page art.
  const dissolve = useSpring({
    opacity: fading ? 0 : 1,
    scale: fading ? 1.04 : 1,
    blur: fading ? 8 : 0,
    config: { duration: DISSOLVE_MS, easing: (t) => 1 - (1 - t) ** 3 },
  });
  const glow = useSpring({
    from: { glow: 0 },
    to: fading
      ? [
          { glow: 0.6, config: { duration: 300 } },
          { glow: 0, config: { duration: 700 } },
        ]
      : { glow: 0 },
  });

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      finishRef.current();
    };
    const unavailable = () => {
      if (done) return;
      done = true;
      (unavailableRef.current || finishRef.current)();
    };
    if (!supported) {
      unavailable();
      return undefined;
    }
    const timer = setTimeout(finish, SAFETY_TIMEOUT_MS);
    const video = videoRef.current;
    const playing = video?.play?.();
    if (playing?.catch) playing.catch(unavailable); // autoplay blocked or decode error
    video?.addEventListener("ended", finish);
    video?.addEventListener("error", unavailable);
    return () => {
      done = true;
      clearTimeout(timer);
      video?.removeEventListener("ended", finish);
      video?.removeEventListener("error", unavailable);
    };
  }, [supported]);

  if (!supported) return null;

  return (
    <div
      className="fixed inset-0 z-20 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Mirrors App.js's <main> + BookFrame box so the video shares the book's position. */}
      <div className="container mx-auto h-full px-4 md:px-16 py-10 flex flex-col items-center justify-center">
        <div
          className="relative flex-shrink-0"
          style={{ width: STAGE_WIDTH, height: BOOK_HEIGHT, transform: `scale(${scale})` }}
        >
          <animated.video
            ref={videoRef}
            data-testid="book-intro-video"
            src={introVideo}
            muted
            playsInline
            autoPlay
            preload="auto"
            className="absolute max-w-none"
            style={{
              width: VIDEO_WIDTH,
              left: VIDEO_LEFT,
              top: VIDEO_TOP,
              opacity: dissolve.opacity,
              transform: dissolve.scale.to((s) => `scale(${s})`),
              filter: dissolve.blur.to((b) => `blur(${b}px)`),
            }}
          />
          <animated.div
            data-testid="book-intro-glow"
            className="absolute -inset-[10%] rounded-full mix-blend-screen"
            style={{
              opacity: glow.glow,
              background:
                "radial-gradient(ellipse at center, rgba(143,184,255,0.55) 0%, rgba(143,184,255,0.18) 40%, rgba(143,184,255,0) 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookIntro;
