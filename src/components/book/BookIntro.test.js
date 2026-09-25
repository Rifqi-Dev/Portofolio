import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import BookIntro from "./BookIntro";

const setMatchMedia = (reduced) => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: reduced && query.includes("reduce"),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
};

const setVideoSupport = ({ canPlay = "probably", play = () => Promise.resolve() } = {}) => {
  jest.spyOn(HTMLMediaElement.prototype, "canPlayType").mockReturnValue(canPlay);
  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(play);
};

beforeEach(() => {
  jest.useFakeTimers();
  setMatchMedia(false);
  Object.defineProperty(navigator, "userAgent", {
    value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140.0 Safari/537.36",
    configurable: true,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

test("autoplays the intro and finishes when the video ends", () => {
  setVideoSupport();
  const onFinish = jest.fn();
  render(<BookIntro onFinish={onFinish} fading={false} />);

  const video = screen.getByTestId("book-intro-video");
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  expect(video.muted).toBe(true);
  expect(onFinish).not.toHaveBeenCalled();

  fireEvent(video, new Event("ended"));
  fireEvent(video, new Event("ended"));
  expect(onFinish).toHaveBeenCalledTimes(1);
});

test("places the video at the calibrated offset on the book frame", () => {
  setVideoSupport();
  render(<BookIntro onFinish={jest.fn()} fading={false} />);
  const video = screen.getByTestId("book-intro-video");
  expect(video.style.width).toBe("134.74%");
  expect(video.style.left).toBe("-15.79%");
  expect(video.style.top).toBe("-7.43%");
  // The book box is the 1024px stage, scaled like the real book (BookFit).
  expect(video.parentElement.style.width).toBe("1024px");
  expect(video.parentElement.style.transform).toMatch(/^scale\(/);
});

// "Unavailable" cases report `onUnavailable` (App.js then shows the loading
// bar) and never `onFinish` (which means the video played to the end).
const renderUnavailable = () => {
  const onFinish = jest.fn();
  const onUnavailable = jest.fn();
  render(<BookIntro onFinish={onFinish} onUnavailable={onUnavailable} fading={false} />);
  return { onFinish, onUnavailable };
};

test("reports unavailable when WebM alpha is unsupported", () => {
  setVideoSupport({ canPlay: "" });
  const { onFinish, onUnavailable } = renderUnavailable();
  expect(onUnavailable).toHaveBeenCalledTimes(1);
  expect(onFinish).not.toHaveBeenCalled();
  expect(screen.queryByTestId("book-intro-video")).toBeNull(); // no opaque frame flash
});

test("reports unavailable on Safari, which drops the alpha channel", () => {
  Object.defineProperty(navigator, "userAgent", {
    value: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) Version/16.0 Mobile/15E148 Safari/604.1",
    configurable: true,
  });
  setVideoSupport();
  const { onFinish, onUnavailable } = renderUnavailable();
  expect(onUnavailable).toHaveBeenCalledTimes(1);
  expect(onFinish).not.toHaveBeenCalled();
});

test("reports unavailable for visitors who prefer reduced motion", () => {
  setMatchMedia(true);
  setVideoSupport();
  const { onFinish, onUnavailable } = renderUnavailable();
  expect(onUnavailable).toHaveBeenCalledTimes(1);
  expect(onFinish).not.toHaveBeenCalled();
});

test("reports unavailable when autoplay is blocked", async () => {
  setVideoSupport({ play: () => Promise.reject(new Error("NotAllowedError")) });
  const { onFinish, onUnavailable } = renderUnavailable();
  await act(async () => {});
  expect(onUnavailable).toHaveBeenCalledTimes(1);
  expect(onFinish).not.toHaveBeenCalled();
});

test("falls back to onFinish when no onUnavailable handler is given", () => {
  setVideoSupport({ canPlay: "" });
  const onFinish = jest.fn();
  render(<BookIntro onFinish={onFinish} fading={false} />);
  expect(onFinish).toHaveBeenCalledTimes(1);
});

test("finishes after the safety timeout if 'ended' never fires", () => {
  setVideoSupport();
  const onFinish = jest.fn();
  render(<BookIntro onFinish={onFinish} fading={false} />);
  act(() => jest.advanceTimersByTime(11999));
  expect(onFinish).not.toHaveBeenCalled();
  act(() => jest.advanceTimersByTime(1));
  expect(onFinish).toHaveBeenCalledTimes(1);
});

test("dissolves the video and flares the glow when fading", async () => {
  jest.useRealTimers(); // react-spring runs on its own frame loop, not jest's fake timers
  setVideoSupport();
  const { rerender } = render(<BookIntro onFinish={jest.fn()} fading={false} />);
  const glow = screen.getByTestId("book-intro-glow");
  expect(Number(glow.style.opacity)).toBe(0);
  rerender(<BookIntro onFinish={jest.fn()} fading />);
  await waitFor(() => expect(Number(glow.style.opacity)).toBeGreaterThan(0.2));
  await waitFor(
    () => expect(Number(screen.getByTestId("book-intro-video").style.opacity)).toBeLessThan(0.05),
    { timeout: 2000 },
  );
});
