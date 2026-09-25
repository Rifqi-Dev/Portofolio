import React, { useEffect, useState } from "react";

// A plain left-to-right typewriter reveal — no scrambling/decryption,
// just the string growing one character at a time. Replays whenever
// `text` changes (keyed remount from the caller works too, but this
// also handles an in-place text swap).
const TypeText = ({ text, speed = 28, startDelay = 0, className = "" }) => {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return <span className={className}>{shown}</span>;
};

export default TypeText;
