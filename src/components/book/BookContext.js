import React, { createContext, useContext, useMemo, useState } from "react";
import bookChapters from "./bookChapters";

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [activeChapter, setActiveChapter] = useState(null);

  const value = useMemo(() => {
    const chapterIds = bookChapters.map((c) => c.id);

    const openChapter = (id) => setActiveChapter(id);
    const closeBook = () => setActiveChapter(null);
    const goToOffset = (offset) => {
      setActiveChapter((current) => {
        if (!current) return current;
        const index = chapterIds.indexOf(current);
        const next = chapterIds[(index + offset + chapterIds.length) % chapterIds.length];
        return next;
      });
    };

    return {
      activeChapter,
      openChapter,
      closeBook,
      nextChapter: () => goToOffset(1),
      prevChapter: () => goToOffset(-1),
    };
  }, [activeChapter]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBook() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBook must be used within a BookProvider");
  return ctx;
}
