import React, { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

// Pure opacity fade, used together with BookFlip's rotateY hinge (not
// as a replacement for it) — BookFlip composes this component so every
// page transition gets both effects: fades in via this component,
// simultaneously rotates via BookFlip's own transform.
const BookFade = ({ fadeKey, children }) => {
  const [style, api] = useSpring(() => ({ opacity: 1 }));

  useEffect(() => {
    api.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 450 },
    });
    // Replays the fade whenever `fadeKey` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeKey]);

  return (
    <animated.div className="h-full" style={{ opacity: style.opacity }}>
      {children}
    </animated.div>
  );
};

export default BookFade;
