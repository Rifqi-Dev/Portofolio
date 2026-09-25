import useMediaQuery from "./useMediaQuery";

// A short landscape viewport: a phone held sideways (e.g. 844x390, or the
// ~740px-wide area of one with notch safe areas), or a very short browser
// window. It gets the desktop book scaled down to fit (BookFit) instead of the
// portrait mobile layout. Tailwind's `md:` breakpoint includes this same
// condition (tailwind.config.js), so the book's `md:` classes apply even when
// the viewport is narrower than 768px. Keep the two in sync.
export const LANDSCAPE_SHORT_QUERY = "(orientation: landscape) and (max-height: 500px)";

export default function useIsLandscapeShort() {
  return useMediaQuery(LANDSCAPE_SHORT_QUERY);
}
