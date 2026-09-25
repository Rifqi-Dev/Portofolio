import React from "react";
import { render, act } from "@testing-library/react";
import BookFit from "./BookFit";

let landscapeShort;

const setViewport = (width, height) => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: height });
};

beforeEach(() => {
  landscapeShort = false;
  window.matchMedia = (query) => ({
    // A getter, like a real (live) MediaQueryList.
    get matches() {
      return query.includes("max-height: 500px") ? landscapeShort : false;
    },
    addEventListener: () => {},
    removeEventListener: () => {},
  });
  global.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
  setViewport(1600, 900);
  // jsdom has no layout: pretend the unscaled book is 683px tall.
  jest.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(683);
});
afterEach(() => jest.restoreAllMocks());

const renderFit = () =>
  render(
    <BookFit>
      <div data-testid="child" />
    </BookFit>,
  );
const stageOf = (container) => container.querySelector("[data-testid=child]").parentElement;

test("always lays the book out at its designed 1024px width", () => {
  const { container } = renderFit();
  expect(stageOf(container).style.width).toBe("1024px");
});

test("on a wide desktop the scale is 1 (a pass-through)", () => {
  const { container } = renderFit();
  expect(stageOf(container).style.transform).toBe("scale(1)");
  expect(stageOf(container).parentElement.style.width).toBe("1024px");
});

test("on a narrower desktop, scales by width so content and frame shrink together", () => {
  setViewport(1080, 800);
  const { container } = renderFit();
  const expected = (1080 - 128) / 1024; // 64px side gutters for the page-mark tabs
  expect(stageOf(container).style.transform).toBe(`scale(${expected})`);
  const outer = stageOf(container).parentElement;
  expect(parseFloat(outer.style.width)).toBeCloseTo(1024 * expected, 3);
  expect(parseFloat(outer.style.height)).toBeCloseTo(683 * expected, 3);
});

test("on a short landscape viewport, also scales to fit the height", () => {
  landscapeShort = true;
  setViewport(844, 390);
  const { container } = renderFit();
  const expected = (390 - 16) / 683; // height is the tighter limit here
  expect(stageOf(container).style.transform).toBe(`scale(${expected})`);
});

test("a tall narrow desktop is not height-limited", () => {
  setViewport(1080, 300); // short, but not flagged landscape-short
  const { container } = renderFit();
  expect(stageOf(container).style.transform).toBe(`scale(${(1080 - 128) / 1024})`);
});

test("measuring does not re-trigger itself (no resize loop)", () => {
  setViewport(1080, 800);
  let resizes = 0;
  const count = () => resizes++;
  window.addEventListener("resize", count);
  renderFit();
  window.removeEventListener("resize", count);
  expect(resizes).toBe(0);
});

test("re-fits when the window is resized", () => {
  const { container } = renderFit();
  setViewport(1000, 800);
  act(() => window.dispatchEvent(new Event("resize")));
  expect(stageOf(container).style.transform).toBe(`scale(${(1000 - 128) / 1024})`);
});
