import React from "react";
import bookChapters from "./bookChapters";
import { useBook } from "./BookContext";

const BookChapterList = () => {
  const { openChapter } = useBook();

  return (
    <ul className="flex flex-col gap-2.5 w-full max-w-xs">
      {bookChapters.map((chapter) => (
        <li key={chapter.id}>
          <button
            type="button"
            onClick={() => openChapter(chapter.id)}
            className="group flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-xl bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)] hover:border-archive-glow hover:shadow-[0_0_16px_rgba(96,140,255,0.55),inset_0_0_10px_rgba(96,140,255,0.3)] transition-all duration-300"
          >
            <img src={chapter.icon} alt="" className="w-10 h-10 flex-shrink-0 object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="text-archive-text font-cormorant text-lg font-semibold">
                {chapter.title}
              </span>
              <span className="text-archive-gold font-inter text-[11px] uppercase tracking-widest">
                {chapter.subtitle}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BookChapterList;
