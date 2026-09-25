import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExperienceCarousel, experiences } from "./ExperiencePanels";

const mockReduced = jest.fn(() => false);
jest.mock("../usePrefersReducedMotion", () => ({
  __esModule: true,
  default: () => mockReduced(),
}));

// jsdom has no layout: give the track/slides fixed geometry so the wheel
// maths runs on real numbers (300px slides, 12px gap, 3 slides).
const WIDTH = 300;
const setGeometry = (track) => {
  Object.defineProperty(track, "clientWidth", { configurable: true, value: WIDTH });
  Array.from(track.children).forEach((slide, i) => {
    Object.defineProperty(slide, "offsetWidth", { configurable: true, value: WIDTH });
    Object.defineProperty(slide, "offsetLeft", { configurable: true, value: i * (WIDTH + 12) });
  });
};

const getTrack = (container) => container.querySelector(".snap-x");
const wheelOf = (track, i) => track.children[i].firstElementChild;

const scrollTo = (track, left) => {
  track.scrollLeft = left;
  fireEvent.scroll(track);
};

beforeEach(() => {
  mockReduced.mockReturnValue(false);
  // Run rAF callbacks synchronously so scroll handlers apply immediately.
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(0);
    return 1;
  });
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

describe("ExperienceCarousel", () => {
  test("renders one slide and one dot per role", () => {
    const { container } = render(<ExperienceCarousel />);
    expect(getTrack(container).children).toHaveLength(experiences.length);
    expect(screen.getAllByRole("button")).toHaveLength(experiences.length);
  });

  test("the snapping slide is never transformed; only its inner wheel wrapper is", () => {
    // Transforming the snap element moves its snap point (card clipped bug).
    const { container } = render(<ExperienceCarousel />);
    const track = getTrack(container);
    setGeometry(track);
    scrollTo(track, 0);
    scrollTo(track, 150);
    Array.from(track.children).forEach((slide) => {
      expect(slide.style.transform).toBe("");
      expect(slide.classList.contains("snap-start")).toBe(true);
    });
    expect(wheelOf(track, 1).style.transform).not.toBe("");
  });

  test.each([0, 1, 2])("card %i rests flat and full-size when centred", (i) => {
    const { container } = render(<ExperienceCarousel />);
    const track = getTrack(container);
    setGeometry(track);
    scrollTo(track, i * (WIDTH + 12));
    const wheel = wheelOf(track, i);
    expect(wheel.style.transform).toBe("translateY(0px) rotate(0deg) scale(1)");
    expect(wheel.style.opacity).toBe("1");
  });

  test("neighbours dip, tilt, shrink and fade, mirrored left/right", () => {
    const { container } = render(<ExperienceCarousel />);
    const track = getTrack(container);
    setGeometry(track);
    scrollTo(track, WIDTH + 12); // card 1 centred
    const left = wheelOf(track, 0).style;
    const right = wheelOf(track, 2).style;
    expect(left.transform).toContain("rotate(5deg)");
    expect(right.transform).toContain("rotate(-5deg)");
    expect(left.transform).toContain("scale(0.9)");
    expect(left.opacity).toBe("0.55");
    expect(parseFloat(left.transform.match(/translateY\(([\d.]+)px/)[1])).toBeGreaterThan(0);
  });

  test("the active dot follows the scroll position", () => {
    const { container } = render(<ExperienceCarousel />);
    const track = getTrack(container);
    setGeometry(track);
    const isActive = (b) => b.firstElementChild.className.includes("w-5");
    scrollTo(track, 2 * (WIDTH + 12));
    expect(screen.getAllByRole("button").map(isActive)).toEqual([false, false, true]);
    scrollTo(track, 0);
    expect(screen.getAllByRole("button").map(isActive)).toEqual([true, false, false]);
  });

  test("tapping a dot scrolls to that card", () => {
    const { container } = render(<ExperienceCarousel />);
    const track = getTrack(container);
    setGeometry(track);
    track.scrollTo = jest.fn();
    fireEvent.click(screen.getByLabelText(`Show ${experiences[2].company}`));
    expect(track.scrollTo).toHaveBeenCalledWith({
      left: 2 * (WIDTH + 12),
      behavior: "smooth",
    });
  });

  test("reduced motion: no wheel transform is applied", () => {
    mockReduced.mockReturnValue(true);
    const { container } = render(<ExperienceCarousel />);
    const track = getTrack(container);
    setGeometry(track);
    scrollTo(track, 150);
    expect(wheelOf(track, 1).style.transform).toBe("");
  });

  test("the track never scrolls vertically (overflow-y hidden, drift reset)", () => {
    const { container } = render(<ExperienceCarousel />);
    const track = getTrack(container);
    setGeometry(track);
    expect(track.classList.contains("overflow-y-hidden")).toBe(true);
    track.scrollTop = 60; // e.g. browser focus/scrollIntoView drift
    scrollTo(track, 0);
    expect(track.scrollTop).toBe(0);
  });
});
