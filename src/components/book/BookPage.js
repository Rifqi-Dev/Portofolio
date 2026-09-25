import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import bookChapters from "./bookChapters";
import BookFlip from "./BookFlip";
import { useBook } from "./BookContext";
import TypeText from "./TypeText";

// Back / Next / Open Chapter: the same card style as the overview's checklist
// rows (`rowClass` below) — navy fill, neon outline, blue glow — with the label
// in a softened `archive-text` (80% opacity; full brightness on hover).
const NAV_BUTTON =
  "flex items-center gap-2 px-4 py-2 rounded-xl bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)] text-archive-text/80 hover:text-archive-text hover:border-archive-glow hover:shadow-[0_0_16px_rgba(96,140,255,0.55),inset_0_0_10px_rgba(96,140,255,0.3)] transition-all duration-300 font-inter text-sm";

// Layout for an open chapter — two states:
//
// Overview (pageIndex === null): left page is the chapter's fixed
// illustration card (icon + description, typed in left-to-right); right
// page is the numbered checklist. It defaults to one row per `subItems`
// entry, but a chapter can override it with its own `checklist` array
// (`{ label, pageIndex } | { label, href }`) to list more names than
// there are real pages — e.g. two role names that share one paired
// page. A row with `href` (Contact's Email/LinkedIn/GitHub) renders as
// a plain link that opens the address directly instead of calling
// `setPageIndex` — it's an action, not a page. Back/Next (below) only
// ever step between `subItems` entries that have a `Panel`/`LeftPanel`,
// never a checklist row directly — so two rows sharing one `pageIndex`
// never turns into two identical steps when paging with Next.
//
// The overview's right page also carries the same Next control (worded
// "Open Chapter", without the arrow, since it opens the chapter rather
// than turning a page), pinned
// at the same bottom position as on paging pages (both states share the
// fixed `minmax` row height), stepping into the first pageable sub-item —
// except chapters flagged `hideOverviewNext` (Contact, whose checklist
// is mostly action links).
//
// Paging (pageIndex is a sub-item index): left page is the current
// sub-item's own content (`LeftPanel` if the entry defines a two-page
// spread, else `Panel`). Right page renders `RightPanel` in full when
// the entry defines one — a fixed spread, like a screenshot (left)
// paired with its description (right), not a dimmed preview of the
// *next* sub-item (that layout was removed per user request) — or
// otherwise holds only the Next control — unless the sub-item sets
// `hideNext: true` (Contact's "Send a Message"), which drops it
// entirely. The left page always sits
// below a `Chapter N / label` heading; if `LeftPanel`'s own content
// already shows that label internally (so showing it twice would be
// redundant), the entry can set `hideLeftLabel: true` — the heading
// shows the chapter's own `title` instead of `current.label`, so the
// space still reads as "which chapter am I in" rather than sitting
// empty. Symmetrically, when `RightPanel` has no heading of its
// own to match that vertical offset (`rightLabel` not set) but still
// needs to start at the same top position as the left card, the entry
// can set `alignRightTop: true` — an invisible two-line spacer of the
// same height renders above `RightPanel`, with no visible text on
// the right. Back sits at the bottom of the left page,
// Next at the bottom of the right page, both pinned to the same fixed
// vertical position on every paging page of every chapter — the
// grid row uses a fixed `minmax` row height
// (`md:grid-rows-[minmax(480px,auto)]`) instead of sizing to whichever
// sub-item's content is tallest, so Back/Next never drift between pages.
// Back from the first *pageable* sub-item returns to the overview; Next
// past the last pageable sub-item advances to the *next chapter* (wraps
// to the first chapter after the last one) instead of looping back to
// this chapter's own overview — stepping skips over any `href`-only
// entries rather than landing on one (they have no `Panel`/`LeftPanel`
// to render). Both pages play a page-flip animation (BookFlip) on every step — the flip is
// paired with an opacity fade so it also fades in.
const BookPage = () => {
  const { activeChapter, nextChapter } = useBook();
  const index = bookChapters.findIndex((c) => c.id === activeChapter);
  const chapter = bookChapters[index];
  const [pageIndex, setPageIndex] = useState(null);

  useEffect(() => {
    setPageIndex(null);
  }, [activeChapter]);

  if (!chapter) return null;

  const { subItems } = chapter;
  const checklistItems =
    chapter.checklist ||
    subItems.map((item, i) => ({ label: item.label, pageIndex: i, href: item.href }));

  // Only entries with a `Panel`/`LeftPanel` are real pages — `href`
  // entries are skipped so Back/Next never lands on one.
  const pageableIndexes = subItems
    .map((item, i) => (item.Panel || item.LeftPanel ? i : null))
    .filter((i) => i !== null);

  // Guards against a `pageIndex` left over from whichever chapter was
  // active before this one — switching chapters via a nav tab (cover
  // list, BookPageMarks) sets `activeChapter` synchronously, but the
  // effect below that resets `pageIndex` back to `null` runs a render
  // later, so the very first render of the new chapter can still carry
  // a `pageIndex` that's out of range, or in range but pointing at a
  // non-pageable `href` entry (e.g. index 1 landing on Contact's
  // LinkedIn row after arriving here straight from Experience's paged
  // index 1). Treating it as the overview until the effect catches up
  // avoids rendering `<LeftPanel />` with an undefined component and
  // crashing.
  const isOverview = pageIndex === null || !pageableIndexes.includes(pageIndex);
  const current = isOverview ? null : subItems[pageIndex];
  const LeftPanel = current && (current.LeftPanel || current.Panel);
  const RightPanel = current && current.RightPanel;

  const pageablePos = pageableIndexes.indexOf(pageIndex);

  const goBack = () =>
    setPageIndex(pageablePos > 0 ? pageableIndexes[pageablePos - 1] : null);
  const goNext = () => {
    if (pageablePos < pageableIndexes.length - 1) {
      setPageIndex(pageableIndexes[pageablePos + 1]);
    } else {
      // Reset synchronously alongside the chapter switch — the
      // activeChapter-watching useEffect below also resets pageIndex,
      // but it runs a render late, and by then subItems[pageIndex]
      // would already resolve against the *new* chapter's (possibly
      // shorter) subItems array and crash.
      setPageIndex(null);
      nextChapter();
    }
  };

  const renderNextButton = (label, { showArrow = true } = {}) => (
    <div className="flex justify-center mt-auto pt-6">
      <button
        type="button"
        onClick={goNext}
        className={NAV_BUTTON}
      >
        {label}
        {showArrow && <FontAwesomeIcon icon={faArrowRight} className="text-xs" />}
      </button>
    </div>
  );

  return (
    <div className="relative w-full">
      {/* `px-24` (not `px-16`) at md+: the ornate frame art (BookFrame's
          background image) has real visual weight — its gold border and
          corner emblems — inset from the frame div's own edge, so a
          content row that reaches all the way to that edge (like a
          checklist row's arrow icon, which sits flush against its own
          row's edge) reads as overflowing past the page even though the
          box model itself never exceeds the frame. Increased per user
          request after a screenshot showed exactly that. */}
      <div
        className="grid md:grid-cols-2 md:grid-rows-[minmax(480px,auto)] gap-8 md:gap-8 px-8 md:px-24 pt-12 pb-12"
      >
        {/* Left page */}
        <BookFlip flipKey={isOverview ? "overview" : current.id} origin="left">
          {isOverview ? (
            <div className="flex flex-col items-center text-center gap-5 px-4 py-10 rounded-xl bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)] h-full">
              <img src={chapter.icon} alt="" className="w-32 h-32 object-contain" />
              <h2 className="font-cinzel text-xl text-archive-text">{chapter.title}</h2>
              <p className="font-cormorant text-archive-gold text-sm uppercase tracking-[0.2em]">
                <TypeText text={chapter.subtitle} speed={35} />
              </p>
              <p className="font-inter text-archive-muted text-sm max-w-xs">
                <TypeText text={chapter.description} speed={16} startDelay={400} />
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5 h-full">
              <div>
                <span className="font-inter text-archive-muted text-xs uppercase tracking-[0.3em]">
                  Chapter {index + 1}
                </span>
                <h3 className="font-cormorant text-2xl text-archive-text">
                  {current.hideLeftLabel ? chapter.title : current.label}
                </h3>
              </div>
              <LeftPanel />

              <div className="flex justify-center mt-auto pt-6">
                <button
                  type="button"
                  onClick={goBack}
                  className={NAV_BUTTON}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                  Back
                </button>
              </div>
            </div>
          )}
        </BookFlip>

        {/* Right page */}
        <BookFlip flipKey={isOverview ? "overview" : current.id} origin="right">
          {isOverview ? (
            <div className="flex flex-col gap-5 h-full">
              <div className="text-center md:text-left">
                <span className="font-inter text-archive-muted text-xs uppercase tracking-[0.3em]">
                  Chapter {index + 1}
                </span>
                <h3 className="font-cormorant text-2xl text-archive-text">{chapter.title}</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {checklistItems.map((item, i) => {
                  const rowClass =
                    "group flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-space-blue/70 border border-archive-glow/50 ring-1 ring-inset ring-white/10 shadow-[0_0_10px_rgba(96,140,255,0.3),inset_0_0_8px_rgba(96,140,255,0.2)] hover:border-archive-glow hover:shadow-[0_0_16px_rgba(96,140,255,0.55),inset_0_0_10px_rgba(96,140,255,0.3)] transition-all duration-300";
                  const rowContent = (
                    <>
                      <span className="font-cormorant text-archive-gold text-sm w-5 flex-shrink-0">
                        {["I", "II", "III", "IV", "V", "VI"][i] || i + 1}
                      </span>
                      <span className="font-inter text-archive-text text-sm flex-1">
                        {item.label}
                      </span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-archive-gold/60 group-hover:text-archive-gold group-hover:translate-x-0.5 transition-all duration-300 text-xs"
                      />
                    </>
                  );
                  return (
                    <li key={`${item.label}-${i}`}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noreferrer"
                          className={rowClass}
                        >
                          {rowContent}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPageIndex(item.pageIndex)}
                          className={rowClass}
                        >
                          {rowContent}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              {!chapter.hideOverviewNext && renderNextButton("Open Chapter", { showArrow: false })}
            </div>
          ) : (
            <div className="relative flex flex-col gap-5 h-full">
              {(current.rightLabel || current.alignRightTop) && (
                <div>
                  <span className="invisible font-inter text-xs uppercase tracking-[0.3em]">
                    Chapter {index + 1}
                  </span>
                  <h3
                    className={`font-cormorant text-2xl text-archive-text ${
                      current.rightLabel ? "" : "invisible"
                    }`}
                  >
                    {current.rightLabel || current.label}
                  </h3>
                </div>
              )}
              {RightPanel && <RightPanel />}

              {!current.hideNext && renderNextButton("Next")}
            </div>
          )}
        </BookFlip>
      </div>
    </div>
  );
};

export default BookPage;
