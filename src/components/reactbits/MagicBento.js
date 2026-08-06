// Adapted from https://reactbits.dev/components/magic-bento
// The original uses GSAP for particles/tilt/magnetism/click-ripple and a
// GlobalSpotlight that lights up cards based on cursor proximity, even
// when the cursor isn't directly over them. This project's animation
// policy (see kapuyuax-project overview) is to avoid stacking another
// animation lib on top of React Spring/AOS/motion; the glow/spotlight
// below still follows that (CSS custom properties, no GSAP). Tilt was
// also CSS-custom-property-driven at first, but that meant every
// mousemove forced the browser to recompute `calc()`/`var()` inside the
// `transform` property under an `!important` override needed to beat
// AOS's cascade — measurably janky, and it made the glow feel laggy too
// since both were fighting for the same style-recalc work on the main
// thread. Given the perf cost, tilt now uses GSAP directly per an
// explicit exception to the no-new-animation-lib policy (see
// decisions/gsap-for-bento-tilt.md) — GSAP writes the resolved matrix to
// `transform` directly each frame instead of relying on the browser to
// interpolate custom properties.
import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

const DEFAULT_GLOW_COLOR = "162, 11, 11"; // #A20B0B — project accent red
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const MAX_TILT_DEG = 2.5;
const TILT_PERSPECTIVE = 1400;

export const MagicBentoCard = ({
  children,
  className = "",
  glowColor = DEFAULT_GLOW_COLOR,
  style,
  enableTilt = true,
  clickEffect = true,
  ...props
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (!enableTilt) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -MAX_TILT_DEG;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * MAX_TILT_DEG;
      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: "power3.out",
        transformPerspective: TILT_PERSPECTIVE,
        overwrite: "auto",
      });
    };

    const handleMouseEnter = () => {
      if (!enableTilt) return;
      gsap.to(card, { y: -4, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleClick = (e) => {
      if (!clickEffect) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("span");
      ripple.className = "magic-bento-ripple";
      ripple.style.width = `${maxDistance * 2}px`;
      ripple.style.height = `${maxDistance * 2}px`;
      ripple.style.left = `${x - maxDistance}px`;
      ripple.style.top = `${y - maxDistance}px`;
      ripple.addEventListener("animationend", () => ripple.remove());
      card.appendChild(ripple);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("click", handleClick);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("click", handleClick);
    };
  }, [enableTilt, clickEffect]);

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card ${className}`}
      style={{ "--glow-color": glowColor, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

// Wraps a set of MagicBentoCards and drives their glow from cursor
// proximity (not just direct hover), matching the original's
// GlobalSpotlight behavior.
export const MagicBentoGrid = ({
  children,
  className = "",
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  ...props
}) => {
  const gridRef = useRef(null);
  // Raw mousemove can fire far more often than the screen repaints (some
  // mice/displays exceed 60-120Hz), and each tick here recomputes layout +
  // sets 3 custom properties per card. Cards with more descendants (Tech
  // Stack: 19 SkillTag pills, Dev Environment: 5 — each individually
  // backdrop-blurred) felt this the most, since every extra raw event is
  // wasted work the browser discards before the next paint anyway.
  // Coalescing to one update per animation frame fixes that.
  const rafIdRef = useRef(null);
  const pendingEventRef = useRef(null);

  const applyGlow = useCallback(
    (e) => {
      const grid = gridRef.current;
      if (!grid) return;

      const proximity = spotlightRadius * 0.5;
      const fadeDistance = spotlightRadius * 0.75;

      grid.querySelectorAll(".magic-bento-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Shortest distance from the cursor to the card's edge (0 if inside).
        const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
        const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
        const distance = Math.hypot(dx, dy);

        let intensity = 0;
        if (distance <= proximity) {
          intensity = 1;
        } else if (distance <= fadeDistance) {
          intensity = (fadeDistance - distance) / (fadeDistance - proximity);
        }

        card.style.setProperty(
          "--glow-x",
          `${((e.clientX - rect.left) / rect.width) * 100}%`,
        );
        card.style.setProperty(
          "--glow-y",
          `${((e.clientY - rect.top) / rect.height) * 100}%`,
        );
        card.style.setProperty("--glow-intensity", intensity.toString());
      });
    },
    [spotlightRadius],
  );

  const handleMouseMove = useCallback(
    (e) => {
      pendingEventRef.current = e;
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        if (pendingEventRef.current) applyGlow(pendingEventRef.current);
      });
    },
    [applyGlow],
  );

  useEffect(() => {
    const handleLeave = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      gridRef.current?.querySelectorAll(".magic-bento-card").forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div ref={gridRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default MagicBentoCard;
