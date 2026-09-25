# Portfolio Project Guidelines

## Project Identity

**Owner:** Rifqi Firlian Pratama — Software Engineer & AI Engineer  
**Site URL:** https://kapuyuaxdev.my.id  
**Stack:** React 18 (CRA), Tailwind CSS 3, JavaScript

---

## Architecture: Storybook UI (State-Switched, Not Router)

This is a **book-themed single-page app** — still NOT multi-page routing,
but no longer a continuous scroll either. See
[[decisions/storybook-navigation|decision note]] (supersedes the earlier
scroll-based architecture note).

- **Do not** reintroduce `react-router-dom` (`BrowserRouter`, `Routes`,
  `Route`, `<Outlet />`) — navigation is a client-side state switch, not
  routing.
- `react-scroll` is **no longer a dependency** — removed along with the
  scroll-nav model.
- **There is no top navbar** — `Navbar.js` was removed. Chapter
  navigation is entirely through `BookChapterList` (on the cover) and
  `BookPageMarks` (the fixed tabs hugging the frame's right edge,
  reachable from anywhere — see `bugs/book-page-marks-viewport-edge-offcenter.md`
  in the vault for why they're positioned that way).
  Don't reintroduce a navbar without asking.
- `src/components/book/` is the navigation shell:
  - `BookContext.js` — `activeChapter` state (`null` = cover, else a
    chapter id), shared by `Book` and anything else that calls
    `useBook()`.
  - `bookChapters.js` — single source of truth for chapters (id, title,
    subtitle, `description`, icon, `subItems: [{id, label, Panel |
    LeftPanel+RightPanel | href}]`). No `Component`/anchor fields
    anymore — see `BookPage.js` below for the three `subItems` shapes.
  - `Book.js` — top-level: renders `BookCover` (closed book / landing)
    or `BookPage` (an open chapter) inside `BookFrame`, with a
    React-Spring hinge swing on change (`prefers-reduced-motion` aware).
    Also renders `BookPageMarks` as a **sibling** of `BookFrame`, not a
    child — see the note below.
  - `BookCover.js` — migrated `Hero` content, centered (left) +
    `BookChapterList` (right). No visitor-stats widget, no rotating
    emblem. The four text lines (Hello World / name / role / tagline)
    each type in via `TypeText` (plain left-to-right, not the removed
    decrypt effect) with staggered `startDelay`s so they type in
    sequence rather than all at once — see
    `features/storybook-redesign.md` in the vault for those follow-ups.
    The avatar's circular wrapper uses `bg-space-blue` behind the
    `<img>` (not `bg-black`, and not fully transparent either) —
    `#0b1633` is the same color `BookFrame.js` uses for its own
    content-area background, so a transparent-background avatar image
    blends with the book's page tone instead of showing a black disc or
    the outer starfield bleeding through.
  - `BookPage.js` — **no in-page header** (see below for why).
    `pageIndex` state: `null` = **overview** (a fixed illustration card
    on the left — icon + `subtitle`/`description` typed in via
    `TypeText` — and a numbered checklist on the right, from
    `chapter.checklist` if the chapter defines one, else one row per
    `subItems` entry by default — see the `checklist` note further
    down); a
    number = **paging**, where the left page is `subItems[pageIndex]`'s
    full `Panel` and the right page holds **only the `Next` control** —
    there is no preview of the next sub-item anymore (an earlier pass
    showed a dimmed `subItems[pageIndex + 1]` preview there; removed per
    user request as "the page that contain[ed] [two sub-items] on one
    screen" — don't reintroduce it without checking). **`Back`/`Next`
    are split across both pages, not a paired row**: `Back` sits at the
    bottom of the *left* page (under `current.Panel`), `Next` at the
    bottom of the *right* page — each its own rounded-rectangle with
    icon + word. (History: first edge-justified, then corrected to a
    centered pair, then split left/right — don't revert without
    checking.) **Fixed vertical position across every paging step of a
    chapter, not just matched left/right on one step**: the grid wrapper
    sets `md:grid-rows-[minmax(480px,auto)]` while paging (not while on
    the overview), so the row-track itself has a fixed minimum height
    instead of implicitly sizing to whichever `subItem`'s `Panel`
    happens to be tallest on that particular step. Combined with
    `align-items: stretch` (CSS Grid's default) and `h-full` on both
    inner content `div`s, both `BookFlip` columns always stretch to that
    same 480px-minimum row, so `mt-auto` pins Back/Next to the exact
    same pixel position whether you're on Tech Stack (19 badges) or At a
    Glance (3 stat cards). Getting L/R to match on a single step isn't
    enough by itself — that only fixes `align-items: stretch`'s
    per-step sizing, not the row-to-row drift across different
    `subItems`; the explicit row minimum is what fixes the latter.
    (Don't switch button placement to `position: absolute` as a
    shortcut — `BookFlip`'s wrapper animates `transform: rotateY(...)`,
    and CSS makes any non-`none` `transform` a containing block for
    absolutely-positioned descendants, so an absolute button would
    anchor to its own flipped column again, not a shared reference.)
    `Back` on the first sub-item returns to the overview; `Next` past
    the last sub-item calls `useBook().nextChapter()` to advance to the
    **next chapter's overview** (wraps last chapter → first chapter,
    `nextChapter()` already implemented in `BookContext.js`) instead of
    looping back to this chapter's own overview. `goNext` calls
    `setPageIndex(null)` **synchronously** alongside `nextChapter()`,
    but don't treat that as the *only* guard needed: `pageIndex` can go
    stale via **any** chapter switch, not just `goNext`'s — clicking a
    different chapter's nav tab (cover list, `BookPageMarks`) sets
    `activeChapter` synchronously, while the `activeChapter`-watching
    `useEffect` that resets `pageIndex` to `null` runs a render *later*.
    A real crash happened this way: leaving Experience mid-page (e.g.
    `pageIndex: 1`) and clicking straight into Contact's nav tab
    resolved `pageIndex: 1` against Contact's `subItems` (an `href`-only
    LinkedIn entry with no `Panel`), and `<LeftPanel />` rendered
    `undefined` (`Element type is invalid ... Check the render method of
    BookPage`) — caught via an in-page
    `window.addEventListener('error', ...)` listener, not
    `read_console_messages` (see the tooling-staleness caveat further
    down). **Fixed at the root, not per call site**: `isOverview` is
    `pageIndex === null || !pageableIndexes.includes(pageIndex)` (see
    `pageableIndexes` below) — any `pageIndex` that doesn't resolve to a
    real page in the *current* chapter is treated as the overview until
    the effect catches up, covering every navigation path at once
    instead of adding a synchronous reset at each one. Both pages flip
    (`BookFlip.js`, which also fades — see its own bullet below) whenever
    `pageIndex` changes.
    **Nothing renders below the book** — chapter content used to
    render there via a `Component` field; that's gone along with the
    four old standalone chapter section files.
    **`subItems` entries can define a fixed two-page spread** instead of
    a single-page `Panel`: `{ id, label, LeftPanel, RightPanel }` — the
    left page renders `LeftPanel`, the right page renders `RightPanel`
    **in full** (not dimmed — real paired content, unrelated to the
    removed next-item-preview concept above). `BookPage.js` resolves the
    left page as `current.LeftPanel || current.Panel`, so old
    single-`Panel` entries keep working unmodified. Used by Projects/FLOW
    (screenshot left / description right, split out of the old single
    `FlowProjectPanel` into `FlowScreenshotPanel` + `FlowDescriptionPanel`
    in `ProjectsPanels.js`) and by Skills & Stack, which is back to a
    **single** `subItems` entry (`skills-tech-stack`: `LeftPanel:
    TechStackPanel, RightPanel: DevEnvironmentPanel`). A prior pass
    duplicated it into two entries pointing at the same spread ("I Tech
    Stack" / "II Dev Environment") so the checklist would list both
    names — but that made `Next` from the page open what looked like the
    exact same page again, which read as a bug rather than a feature
    (user: "it should open[] once because tech stack and dev environment
    [are] in one page"). This went combined (1 entry) → un-paired (2
    entries, separate content) → paired again with a leftover standalone
    Dev Environment page (2 entries) → collapsed to one combined page (1
    entry) → duplicated to two entries pointing at the same page (2
    entries) → collapsed back to one (1 `subItems` entry, but two
    `checklist` rows pointing at it — see the `checklist` field note
    below) across seven follow-ups — check `features/storybook-redesign.md`
    before changing this again.
    An optional `rightLabel` field on the
    same entry shape (e.g. `rightLabel: "Dev Environment"`) renders a
    heading above `RightPanel`, for panels with no heading of their own
    (`DevEnvironmentPanel`); omit it when `RightPanel` already renders
    its own heading internally (FLOW's `FlowDescriptionPanel` does, via
    its "Featured Project" eyebrow + title) — don't add `rightLabel`
    there, it would double up. `rightLabel`'s heading in `BookPage.js`
    is wrapped in the same two-line block as the left heading (an
    `invisible` "Chapter N" spacer above it), not a bare `<h3>` — that
    was a real bug (right heading rendered visibly higher than left)
    fixed by matching the left heading's markup structure rather than
    just its font classes. **`alignRightTop: true`** is the same fix for
    entries where `RightPanel` needs no *visible* heading of its own
    (unlike `rightLabel`) but still needs to start flush with the left
    card's top — Experience's `experience-0` entry (PT. Inovasi /
    PT. Tjakrabirawa paired page) sets it because both sides render
    `ExperienceDetailsPanel`, which already draws its own heading
    *inside* the card, so without `alignRightTop` the right card started
    higher than the left one (which sits below the external "Chapter 2 /
    label" heading). With `alignRightTop`, the same invisible two-line
    spacer renders, but the `<h3>` itself is also `invisible` — matching
    height, no visible text. **`hideLeftLabel: true`** is the mirror
    case, on the *left* column: when `LeftPanel`'s own content already
    shows the entry's name internally (again, `ExperienceDetailsPanel`),
    the outer "Chapter N / label" heading shows `chapter.title` (e.g.
    "Work Experience") instead of `current.label` — still fully visible,
    just a different, non-redundant text source — rather than repeating
    the company name a second time above the card. (An earlier version
    made the `<h3>` `invisible` instead of swapping its text, leaving the
    heading area blank; the user asked for the chapter title there
    instead so the space still says something.) Set on Experience's
    `experience-0` (PT. Inovasi) and `experience-2` (PT. Ondel) entries.
    `alignRightTop` still uses the `invisible`-spacer trick on the right
    column (there's no equivalent "show something else" text for a
    column with no heading at all) — don't confuse the two: `alignRightTop`
    adds a spacer that was never there; `hideLeftLabel` swaps the text of
    one that's already visible. **`hideNext: true`** on a `subItems`
    entry suppresses the `Next` button on its right page — set on
    Contact's `contact-form` entry (the last pageable entry in the last
    chapter; submitting the form is the natural end of the flow, and
    `Next` would otherwise wrap back around to Skills & Stack, which
    reads as a dead end rather than a next step). `AtAGlancePanel` was deleted
    outright from `SkillsPanels.js` (confirmed unreferenced via `grep`
    first) when
    "At a Glance" was dropped from the flow.
    **`subItems` entries can also be `{ id, label, href }` — an action
    link, not a page.** In the overview checklist, an entry with `href`
    renders as a plain `<a>` (`target="_blank" rel="noreferrer"`, no
    `target` for `mailto:`) instead of a `<button onClick={() =>
    setPageIndex(i)}>` — clicking it opens the address directly rather
    than paging into the book. Used by Contact's Email/LinkedIn/GitHub
    (only its `contact-form` entry, "Send a Message", is a real page).
    Since `pageIndex` is a raw index into `subItems`, Back/Next don't
    step by ±1 through the raw array — they step through
    `pageableIndexes` (the indices of entries that actually have a
    `Panel`/`LeftPanel`), skipping `href`-only entries entirely, so
    paging can never land on one and try to render a nonexistent
    `Panel`. For Contact this means Back from Send a Message returns
    straight to the overview and Next from it advances straight to the
    next chapter — don't "fix" this to step by raw index again, it was
    a real crash risk (GitHub's entry has no `Panel`) before the
    `pageableIndexes` fix. `ContactEmailPanel`/`ContactLinkedInPanel`/
    `ContactGithubPanel` and their shared `ContactLink` component were
    deleted from `ContactPanels.js` once nothing referenced them anymore
    (confirmed via `grep` first) — `ContactFormPanel` is the only export
    left there.
    **A chapter can add `checklist: [{ label, pageIndex } | { label,
    href }]`** to decouple the overview's numbered list from `subItems`
    entirely — without it, the checklist defaults to one row per
    `subItems` entry (1:1, computed in `BookPage.js`). With it, multiple
    rows can point at the *same* `pageIndex`: Skills & Stack's
    `checklist` lists "Tech Stack" and "Dev Environment" as two rows
    both pointing at `pageIndex: 0` (there's only one real page); Work
    Experience's lists all three company names, with the first two both
    pointing at `pageIndex: 0` (they share a page) and the third at
    `pageIndex: 1`. This exists specifically so Back/Next (which only
    ever step through `pageableIndexes`, never through checklist rows)
    can't be made to replay a page just because two checklist rows
    happen to point at it — don't try to "simplify" this by going back
    to a `subItems`-per-checklist-row model, that's what caused Next to
    visibly repeat a page in an earlier pass.
    **The overview's right page also carries a Next-style button**
    (labeled "Open Chapter", no arrow, since it opens the chapter rather
    than turning a page — both variants share one `renderNextButton(label,
    { showArrow })` helper), pinned at the same bottom position as the
    paging pages, stepping into the first pageable sub-item — except
    chapters with `hideOverviewNext: true` (Contact, whose
    checklist is mostly `href` action links rather than pages, so a
    generic "Next" there would be a dead-end-feeling default rather than
    a useful shortcut).
    left there.
  - `BookFlip.js` — wraps a page's content, replays a `rotateY` hinge
    (`useSpring`+`useEffect`, same idiom as `Book.js`'s cover↔chapter
    hinge) whenever its `flipKey` prop changes. **The hinge is always
    the spine (book center), not the page's own same-named edge** — a
    left page's spine is its own *right* edge, a right page's spine is
    its own *left* edge. An earlier version hinged both pages at their
    own *outer* edge instead — the opposite mistake — which read as both
    pages flipping outward/backwards instead of pivoting from the center
    like a real book; caught via user report ("the right side is
    flipping to the right instead of to the left") and confirmed by
    forcing `rotateY` on plain non-React test boxes with each origin
    combination and comparing screenshots, since React's own re-renders
    fight a live override of its animated inline style.
    **The pivot is also offset past each column's own edge by half the
    grid gap**, not flush with it: `transformOrigin` is
    `origin === "left" ? "calc(100% + 1rem) center" : "calc(0% - 1rem)
    center"` (the `1rem` is `halfGap`, half of `BookPage.js`'s `gap-8`
    grid gap between the two columns). Flush-with-the-edge hinging put
    the pivot visibly inside the gap rather than at its middle, since
    each column's own edge sits `1rem` short of the container's true
    center line — a user screenshot with a highlighted center strip
    caught this. **Keep `halfGap` in `BookFlip.js` in sync with
    `BookPage.js`'s grid gap** if that Tailwind class ever changes,
    or the pivot will drift off-center again. Don't "fix" either of
    these back to the simpler (but wrong) same-edge/flush mapping
    without re-deriving it the same way (forcing rotation on test boxes,
    and/or measuring `column.getBoundingClientRect().left +
    parseFloat(transformOrigin)` against the grid's own center).
    **The `rotateY` swing is paired with an opacity fade, via a separate
    `BookFade.js` component composed inside `BookFlip`** — not a second
    spring inlined into `BookFlip`'s own `useSpring`. `BookFlip`'s
    `animated.div` (which owns the rotateY transform) wraps `children`
    in `<BookFade fadeKey={flipKey}>`; `BookFade` runs its own
    `useSpring` for opacity only (`0→1`, 450ms). Both springs run
    simultaneously on every transition — `BookFlip` rotates, `BookFade`
    fades, at the same time, each independently. History: the user
    first asked for a fade but explicitly said not to remove the flip,
    which got implemented as a second property (`opacity`) on
    `BookFlip`'s existing spring, with no separate `BookFade.js` file at
    all; the user then asked to "use both bookflip and book fade
    animation," so `BookFade.js` was recreated as its own component and
    composed into `BookFlip` rather than inlining the opacity animation
    — don't re-merge them back into one spring without checking why this
    split exists. **Both `BookFlip`'s own `animated.div` and
    `BookFade`'s wrapper need `className="h-full"`** — each is a plain
    `div` sitting between `BookPage.js`'s grid cell (which stretches to
    the fixed `minmax(480px,auto)` row) and the actual page content
    (which relies on `h-full` + `flex flex-col` + `mt-auto` to pin its
    Back/Next button to the bottom); without `h-full` on *both* wrapper
    layers the stretch doesn't cascade down, each wrapper defaults to
    `height: auto`, and a shorter page's Back/Next drifts up to sit
    right under its own content instead of at the shared bottom position
    — composing `BookFade` inside `BookFlip` added exactly one more
    layer this height chain has to pass through.
  - `TypeText.js` — plain character-by-character left-to-right reveal
    (no scrambling). Only used on the chapter overview's
    subtitle/description; the cover's text is fully static.
  - `src/components/book/panels/` — the actual per-`subItem` content,
    one file per chapter: `SkillsPanels.js` (`TechStackPanel`,
    `DevEnvironmentPanel`), `ExperiencePanels.js` (`experiences` array +
    `ExperienceDetailsPanel({index})`/`ExperienceStackPanel({index})` —
    split from a single `ExperiencePanel` so Experience could use the
    same `LeftPanel`/`RightPanel` spread as Skills), `ProjectsPanels.js`
    (`FlowScreenshotPanel`, `FlowDescriptionPanel` — split from the old
    single `FlowProjectPanel`), `ContactPanels.js` (`ContactFormPanel`
    only — the real EmailJS-backed form; the old
    `ContactEmailPanel`/`ContactLinkedInPanel`/`ContactGithubPanel` +
    shared `ContactLink` were deleted once Contact's Email/LinkedIn/
    GitHub became `href` action links instead of pages, see below).
    These are the **only** place this content lives now; `Skills.js`, `Experience.js`,
    `Projects.js`, `Contact.js` (the old full-section components) were
    deleted, not kept around unused. Each `Panel` renders standalone
    (no card wrapper) since `BookPage.js` now uses them both as full
    left-page content and as dimmed right-page previews.
  - `BookPageMarks.js` — `position: fixed` vertical tab strip (a cover
    tab + one roman-numeral tab per chapter), always visible, calls
    `useBook()` to switch chapters. Its horizontal position is measured
    off the actual book frame, not a flat distance from the viewport
    edge — it takes a `frameRef` prop (`Book.js` creates the ref and
    passes it to both `BookFrame` and `BookPageMarks`; `BookFrame`
    attaches it to its outer wrapper via a plain `frameRef` prop, not
    React's reserved `ref` — no `forwardRef`), reads
    `frameRef.current.getBoundingClientRect()` on mount/resize/
    `ResizeObserver`, and sets `left: frame.right + 20px` (clamped so it
    never overflows off-screen). A flat viewport-edge offset left a
    large gap between the frame and the tabs at wide viewports, making
    the book+tabs group look off-center even though the frame alone was
    centered — see
    [[bugs/book-page-marks-viewport-edge-offcenter|the bug this fixed]].
    Rendered as a sibling of `<BookFrame>` in `Book.js`, deliberately
    **not** nested inside it: `BookFrame`'s children use
    `transform-style: preserve-3d` (and `Book.js` applies its own
    `rotateY` transform), and any non-`none`/`flat` `transform`/
    `transform-style` makes an element a containing block for
    `position: fixed` descendants — nesting the tabs in there would
    pin them to the frame instead of the viewport.
- `Hero.js` was removed — its content lives in `BookCover.js` now.
- `Navbar.js`, `VisitorCount.js`, `Skills.js`, `Experience.js`,
  `Projects.js`, `Contact.js`, `reactbits/DecryptedText.js`,
  `reactbits/MagicBento.js`/`.css`, `service/analyticService.js`,
  `context/VisitorStatsContext.js` — all deleted over the course of this
  redesign, each confirmed fully unreferenced (via `grep`) before
  removal. Don't be surprised they're gone; don't recreate them without
  checking the relevant vault note first (each removal has one).

### Chapters (formerly "sections")

| # | Chapter id   | subItems come from        |
| - | ------------ | -------------------------- |
| — | *(cover)*    | n/a — `<BookCover />` (migrated `Hero` content) |
| 1 | `skills`     | `panels/SkillsPanels.js`     |
| 2 | `experience` | `panels/ExperiencePanels.js` |
| 3 | `projects`   | `panels/ProjectsPanels.js`   |
| 4 | `contact`    | `panels/ContactPanels.js`    |

Only one view (cover or one chapter) is mounted at a time, in normal
document flow, so page-level scroll works as expected. (An earlier
attempt at a fixed-height "viewport" frame with internal
`overflow-y-auto` scroll broke `AOS`'s reveal-on-scroll entirely —
moot now since the panels don't use AOS, but still don't reintroduce
that pattern.)

**Corollary**: since the cover and each chapter unmount/remount every
time you navigate away and back, don't fetch data in a mount-effect of
a component that lives inside one of them — it'll refire on every trip
back, not just once. Fetch-once data belongs in a provider mounted at
`App.js` level, outside the cover/chapter switch. (This bit the site's
old visitor-analytics widget, which is why it no longer exists — see
`features/storybook-redesign.md` and `bugs/visitor-analytics-refetch-on-cover-nav.md`
in the vault. If a similar "fetch once" need comes up again, don't
reach for `axios`/a new service without checking
`bugs/visitor-analytics-refetch-on-cover-nav.md` first.)

---

## Visual Theme: Celestial Archive (Space / Galaxy)

### Background

- `StarField.js` draws the moving/twinkling star canvas (unchanged
  mechanism), now with a **transparent** canvas background.
- Behind it, `App.js` renders a fixed full-bleed space illustration
  (`src/components/book/assets/space-background.png`) with a dark
  gradient overlay for text legibility — replaces the old flat
  `#000000` background.
- `BookFrame.js` additionally uses
  `src/components/book/assets/book-page-bg.png` (an ornate
  compass/starfield illustration) pinned to the top of the frame in an
  `aspect-[3/2]` box (the file's native 1536×1024 ratio), so it always
  renders undistorted — not stretched to match the frame's variable
  content height. No extra CSS border/corner-bracket overlay or title
  text on top of it; the frame's own artwork is the only ornamentation.
- The frame's **content** wrapper (siblings `children`) shares that same
  `aspect-[3/2]` class plus `flex flex-col justify-center` — gives it a
  matching *minimum* height (content can still grow it taller, per the
  CSS "automatic minimum size" rule for `aspect-ratio` boxes) so short
  content (the cover) centers vertically inside the book instead of
  sitting flush against the top, while tall content (a chapter) just
  grows the box from the top, unchanged. `App.js`'s `<main>` also has
  `justify-center` (vertically centers the whole book on the page) —
  this was removed at one point while chasing
  `bugs/book-page-sticky-header-overlap.md`, then reinstated once it
  was confirmed `justify-center` on a `min-h-screen` flex column is a
  no-op once content exceeds the viewport (the container's height just
  grows to match), so it was never actually the cause of that bug.
- Both images are large (~2.4–2.6MB PNGs) — a real optimization
  candidate (resize/convert to WebP) before this ships to production,
  not yet done.
- **`BookFrame.js`'s wrapper must not get `overflow-hidden`/`-auto`/etc.**
  again (it clips the image to `rounded-2xl` — that's now done by
  rounding the image div's own corners instead). Any non-`visible`
  `overflow` there becomes the containing block for any `position:
  sticky`/`fixed` descendant, pinning it relative to that div instead
  of the viewport — this is what broke `BookPage.js`'s old sticky
  chapter header (since deleted entirely — see
  `bugs/book-page-sticky-header-overlap.md` in the vault) and would do
  the same to anything similar added later.

### Color Palette — "Celestial Archive" (replaces the old red/black theme)

CSS custom properties in `src/index.css` (`:root`), mirrored as Tailwind
tokens in `tailwind.config.js` (`theme.extend.colors`):

| Token           | Value     | Tailwind class                          | Usage                              |
| --------------- | --------- | ---------------------------------------- | ----------------------------------- |
| `--space`       | `#050B1A` | `bg-space`                               | Page background                     |
| `--space-blue`  | `#0B1633` | `bg-space-blue`                          | Book panel background               |
| `--text`        | `#E8E5D8` | `text-archive-text`                      | Primary body text                   |
| `--muted`       | `#8D98B5` | `text-archive-muted`                     | Secondary/muted text                |
| `--gold`        | `#C9B88A` | `text-archive-gold` / `border-archive-gold` | Primary accent, borders, buttons |
| `--glow`        | `#8FB8FF` | `text-archive-glow` / `bg-archive-glow`  | Secondary accent, hover glow        |

This palette applies everywhere now, including
`src/components/book/panels/` — the chapter content (previously
`Skills.js`/`Experience.js`/`Projects.js`/`Contact.js`, which still had
old `red-400`/`red-700`/`red-800`/`#A20B0B` accents) was fully
re-themed to `archive-gold`/`archive-glow`/`archive-text`/
`archive-muted` when it was extracted into the panels. There's no
lingering red-accent content left in the book.

### Typography

Three fonts (Google Fonts, imported in `src/index.css`), each with a
specific role — **don't mix them arbitrarily**:

- **Cinzel** (`font-cinzel`) — the cover's name heading (no separate
  site/book title element — removed in favor of letting the frame art
  itself be the only chrome). Display use only, not body text.
- **Cormorant Garamond** (`font-cormorant`) — chapter/section headings
  (e.g. "My Skills", "My Projects", the cover's chapter list titles,
  the role line "Software & AI Engineer").
- **Inter** (`font-inter`) — body copy, labels, buttons, nav.
  `tailwind.config.js` also repoints the existing `font-poppins`
  utility to Inter (instead of renaming every existing
  `className="font-poppins ..."` across the codebase) — new code
  should use `font-inter` directly rather than relying on that alias.

### Glassmorphism Cards

All section cards use:

```jsx
className = "backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl";
```

### Animations

- **Page animations:** `@react-spring/web` — use `useSpring` / `useTrail` for entrance animations.
- **Scroll animations:** `aos` library — initialize with `{ duration: 1500 }`.
- **Number counters:** `@react-spring/web` `animated.span` with spring from `0` to target.
- **Hover effects:** Tailwind `hover:scale-105 transition-transform duration-300`.
- **Do NOT** use `framer-motion` — not in the project.
- **`gsap` is not a dependency of this project** (removed — see
  `decisions/gsap-for-bento-tilt.md` in the vault, now superseded: it
  was scoped to the Skills bento grid's tilt effect, which no longer
  exists). Don't add it back without a concrete performance
  justification like that note describes — React Spring/AOS remain the
  defaults for everything.

---

## UI Component Libraries

### Magic UI — https://magicui.design/

- Components are **copy-pasted** into `src/components/magicui/` (not npm-installed as a whole package).
- Built with React + TypeScript + Tailwind CSS + Motion (Framer Motion).
- Use for: animated text effects, border beams, shimmer buttons, meteors, sparkles, number tickers, typing animations.
- Install individual components via CLI: `npx shadcn@latest add "https://magicui.design/r/<component>"`.
- Always check https://magicui.design/docs/components/<component-name> before implementing.

### React Bits — https://reactbits.dev/

- Components are **copy-pasted** into `src/components/reactbits/` (not npm-installed as a whole package).
- Use for: animated backgrounds, text effects, creative UI patterns (StarField, Aurora, etc.).
- Pick the **JS + Tailwind** flavor when copying components (not TypeScript, since this is a JS CRA project).
- Install via: `npx shadcn@latest add @react-bits/<ComponentName>` or copy source directly.

---

## Icons

Always use **FontAwesome** (`@fortawesome/react-fontawesome`). Never use other icon libraries.

```jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
<FontAwesomeIcon icon={faGithub} />;
```

---

## Toast / Alerts

Always use **SweetAlert2** (`sweetalert2`). Never use `react-toastify` or browser `alert()`.

```jsx
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});
Toast.fire({ icon: "success", title: "Message sent!" });
```

---

## Section Content

### 1. Cover (`BookCover.js`, migrated from the old Hero section)

Both halves are centered (not left-aligned) — a deliberate call, don't
reintroduce `md:items-start`/`md:text-left` here without asking.

- Avatar photo (existing CDN URL from `intro.js`)
- Name: **Rifqi Firlian Pratama** (`font-cinzel`)
- Role: **Software Engineer & AI Engineer** (`font-cormorant`)
- Tagline (`font-inter`, restored to the original longer copy — not the
  shorter "Building systems that connect..." line from an earlier pass
  of this redesign): "Passionate about building intelligent systems and
  elegant web experiences. Specializing in computer vision, full-stack
  development, and AI-driven solutions."
- Social links: LinkedIn, GitHub, Instagram, Email — wrapped in `<NeonContainer>`
- `<BookChapterList />` on the other half of the cover.
- **No visitor-stats widget, no rotating emblem, no "Write Story"
  button, no top navbar** — all existed earlier in this redesign and
  were removed per user request. Don't re-add any of them without
  asking; if visitor analytics comes back, read
  `bugs/visitor-analytics-refetch-on-cover-nav.md` in the vault first
  (the mount-refetch trap it documents is still real).

### 2. Skills chapter (`panels/SkillsPanels.js`)

**Two** `subItems` ("I Tech Stack" / "II Dev Environment"), both
pointing at the **same** `LeftPanel`/`RightPanel` spread — Tech Stack
badges on the left, Dev Environment badges on the right, differing only
in which one the left heading names. No "At a Glance" anymore
(`AtAGlancePanel` was deleted, along with the stat-card data) — this
went through several redesigns (combined → separated → paired →
duplicated), see `features/storybook-redesign.md` before changing it.

- **Tech Stack** (`TechStackPanel`) — tag cloud, data in the file's
  `hardSkills` array: JavaScript, TypeScript, React, Angular, Node.js,
  Express.js, Python, OpenCV, PostgreSQL, MongoDB, Docker, Tailwind
  CSS, CSS3, Git, REST APIs, Computer Vision, FFmpeg, JIRA, Bun.
- **Dev Environment** (`DevEnvironmentPanel`) — `tools` array: VS Code,
  Linux, Postman, Anaconda, LabelMe, CVAT.

Tags use `devicon`/FontAwesome icons per entry (see `SkillTag` in that
file), not shield.io badges.

### 3. Experience chapter (`panels/ExperiencePanels.js`)

**Two** `subItems`, not one per role — `experiences[0]` and
`experiences[1]` (PT. Inovasi / PT. Tjakrabirawa) share one page:
`ExperienceDetailsPanel index={0}` on the left, `ExperienceDetailsPanel
index={1}` on the right. `ExperienceDetailsPanel` always renders its
own company/role/period heading internally (the name belongs *inside
the card* — don't hide it there, per user correction). Instead:
`alignRightTop: true` on this entry adds an invisible spacer above the
right column so it starts flush with the left card's top (there's no
`rightLabel` — the right card's own internal heading already shows the
name, `alignRightTop` just matches the vertical offset); `hideLeftLabel:
true` makes the *left* column's outer "Chapter 2 / label" heading
invisible instead, since `ExperienceDetailsPanel`'s card already shows
PT. Inovasi's name there too and showing it twice would be redundant.
`experiences[2]` (PT. Ondel, the odd one out with nothing left to pair
against) is a plain single-`Panel` entry — `ExperienceDetailsPanel
index={2}` on the left (also `hideLeftLabel: true`, same reasoning),
right side is nav-only (an earlier pass paired it with
`ExperienceStackPanel`/`rightLabel: "Tech Stack"`; removed per user
request, and `ExperienceStackPanel` deleted along with it since nothing
else used it). The checklist correspondingly shows two entries, not
three — PT. Tjakrabirawa has no checklist row of its own, reachable only
by opening PT. Inovasi's page. The `experiences` array (also exported
from this file) is the single source of truth for the data:

```
PT. Inovasi Teknologi Olahraga | AI Engineer | August 2025 – Present | Contract · Remote
PT. Tjakrabirawa Teknologi Indonesia | AI Engineer | October 2024 – August 2025 | Contract · Remote
PT. Ondel Teknologi Indonesia | Full Stack Developer | August 2023 – May 2025 | Contract · Jakarta Utara
```

### 4. Projects chapter (`panels/ProjectsPanels.js`)

One `subItem` ("FLOW — Finance Tracker"), a `LeftPanel`/`RightPanel`
spread: `FlowScreenshotPanel` (screenshot only, links out on hover) on
the left, `FlowDescriptionPanel` (eyebrow, title, description, stack
badges, "Visit Site") on the right — split from an earlier single
`FlowProjectPanel` that stacked both in one card.

- URL: http://flow.kapuyuaxdev.my.id/
- Description: Offline-first PWA for tracking expenses, income, loans, budgets, savings, and pockets with optional Google-authenticated cloud sync across devices.
- Tech stack: React 19, Vite, TypeScript, Zustand, Dexie (IndexedDB), Recharts, Node.js, Express, Prisma, PostgreSQL, Docker
- Screenshot: `https://api.screenshotmachine.com?key=67285c&url=http://flow.kapuyuaxdev.my.id/&dimension=1024x600` (existing API key pattern, unchanged)

### 5. Contact chapter (`panels/ContactPanels.js`)

Four `subItems`, two different shapes: **Email**/**LinkedIn**/**GitHub**
are `href` action links (`mailto:`/external URL) — clicking them in the
checklist opens the address directly, no page involved, no `Panel`.
**Send a Message** is the one real page, opening `ContactFormPanel` —
the real form, `emailjs.sendForm` + SweetAlert2 `Toast` on
success/failure, moved verbatim from the old `Contact.js` (same
`service_id`/`template_id`/`public_key`, same field names: `from_name`,
`from_email`, `subject`, `message`). There used to be a small
`ContactLink`-based info card per Email/LinkedIn/GitHub entry; deleted
once those became direct links (one extra, pointless step otherwise).

---

## What to Remove

- `OnlineCompiler` component and all its sub-components (`Editor.js`, `Output.js`)
- `About.js` (stub, unused)
- `Weather.js` and `Earthquacke.js` (unused in current layout)
- `Sidenav` component
- `Layout` component (replaced by flat scroll layout)
- All `react-router-dom` usage (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `useNavigate`, etc.)
- `monaco-editor-webpack-plugin` and `react-monaco-editor` from package.json if OnlineCompiler is removed
- `@babel/standalone` if OnlineCompiler is removed

---

## File Organization

```
src/
  components/
    book/
      Book.js              # top-level state machine (cover vs open chapter)
      BookContext.js       # activeChapter state, read via useBook()
      bookChapters.js      # chapter config (id, title, description, icon, subItems: [{id, label, Panel}])
      BookFrame.js         # shell — book-page-bg.png pinned at native 3:2 ratio
      BookChapterList.js   # chapter links on the cover
      BookCover.js         # cover view (migrated Hero content, centered + chapter list)
      BookPage.js          # open-chapter: overview ⇄ two-page pagination through subItems (no header)
      BookPageMarks.js     # fixed chapter tabs, hugs frame's right edge (sibling of BookFrame, see above)
      BookFlip.js          # rotateY page-flip, composes BookFade for opacity, used per-column in BookPage.js
      BookFade.js          # opacity-only fade, composed inside BookFlip (also usable standalone)
      TypeText.js          # plain left-to-right typewriter reveal (chapter overview only)
      usePrefersReducedMotion.js
      panels/
        SkillsPanels.js     # TechStackPanel, DevEnvironmentPanel
        ExperiencePanels.js # experiences array + ExperienceDetailsPanel/ExperienceStackPanel({index})
        ProjectsPanels.js   # FlowScreenshotPanel, FlowDescriptionPanel
        ContactPanels.js    # ContactFormPanel only (Email/LinkedIn/GitHub are `href` links now, no Panel)
      assets/
        space-background.png  # full-bleed site background
        book-page-bg.png       # BookFrame's own background image
    Footer.js        # keep existing
    NeonContainer.js # keep existing
    magicui/         # Magic UI copy-paste components
    reactbits/       # React Bits copy-paste components — DecryptedText.js and
                      # MagicBento.js/.css deleted (both fully unused after this redesign)
  service/
    textEditorService.js # remove when OnlineCompiler removed
  utils/
    stars-particles.json # keep or replace with ReactBits StarField
```

---

## Coding Conventions

- All components are **function components** with hooks. No class components.
- Use **Tailwind CSS** utility classes. No inline `style={{}}` unless for dynamic values (e.g., spring animations).
- Prefer `const` arrow functions: `const Hero = () => { ... }; export default Hero;`
- Use `useEffect` + `AOS.init({ duration: 1500 })` in the root component or each section that needs scroll animations.
- `@react-spring/web` for number tickers and entrance animations; `aos` for scroll-triggered reveals.
- Do not add TypeScript — project is JavaScript CRA.
