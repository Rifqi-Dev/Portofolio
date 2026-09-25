import React from "react";

const CARD =
  "rounded-xl bg-white/[0.06] md:bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)]";

// Mobile section for one chapter: a banner plus a 2-column bento grid built
// from the chapter's `bentoTiles` (see bookChapters.js). Rendered once per
// chapter, stacked, by BookMobileScroll.
const BookBentoPage = ({ chapter }) => {
  return (
    <div className="w-full h-full flex flex-col px-4 pt-5 pb-6">
      {/* Compact banner: small icon + title/subtitle on one slim row, no card
          around it. The chapter description is left out on mobile to keep
          content high. */}
      <div className="flex items-center gap-3 px-1 py-1 mb-3">
        <img src={chapter.icon} alt="" className="w-10 h-10 object-contain flex-shrink-0" />
        <div className="min-w-0">
          <h2 className="font-cinzel text-base text-archive-text leading-tight">{chapter.title}</h2>
          <p className="font-cormorant text-archive-gold text-[11px] uppercase tracking-[0.2em]">
            {chapter.subtitle}
          </p>
        </div>
      </div>

      <div
        className={`grid grid-cols-2 gap-3 mt-3 ${chapter.fillScreen ? "flex-1" : ""}`}
        style={chapter.fillScreen ? { gridTemplateRows: "1fr" } : undefined}
      >
        {chapter.bentoTiles.map(({ id, span, title, bare, Tile }) => (
          <div key={id} className={`${span === 2 ? "col-span-2" : "col-span-1"} ${chapter.fillScreen ? "h-full" : ""}`}>
            {bare ? (
              <Tile />
            ) : (
              <div className={`${CARD} p-4 h-full flex flex-col`}>
                {title && (
                  <h3 className="font-cormorant text-xl text-archive-text mb-3">{title}</h3>
                )}
                <div className="flex-1 flex flex-col min-h-0">
                  <Tile />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookBentoPage;
