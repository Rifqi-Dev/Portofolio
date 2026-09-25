import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    // Also re-check on `resize`: `change` is only dispatched with the next
    // rendered frame, which is skipped while the page is hidden/backgrounded.
    const recheck = () => setMatches(mql.matches);
    mql.addEventListener("change", handler);
    window.addEventListener("resize", recheck);
    return () => {
      mql.removeEventListener("change", handler);
      window.removeEventListener("resize", recheck);
    };
  }, [query]);

  return matches;
}
