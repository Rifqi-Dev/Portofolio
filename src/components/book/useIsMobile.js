import useMediaQuery from "./useMediaQuery";
import useIsLandscapeShort from "./useIsLandscapeShort";

// Portrait-ish phones: narrower than Tailwind's 768px `md` and NOT a short
// landscape viewport (those get the scaled desktop book, see BookFit.js).
export const MOBILE_QUERY = "(max-width: 767px)";

export default function useIsMobile() {
  const narrow = useMediaQuery(MOBILE_QUERY);
  const landscapeShort = useIsLandscapeShort();
  return narrow && !landscapeShort;
}
