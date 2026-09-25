import React from "react";
import skillsIcon from "./assets/icons/chapter-skills.png";
import experienceIcon from "./assets/icons/chapter-experience.png";
import projectsIcon from "./assets/icons/chapter-projects.png";
import contactIcon from "./assets/icons/mail.png";
import {
  TechStackPanel,
  DevEnvironmentPanel,
  TechStackBento,
  DevEnvironmentBento,
} from "./panels/SkillsPanels";
import { ExperienceDetailsPanel, ExperienceCarousel, experiences } from "./panels/ExperiencePanels";
import { FlowScreenshotPanel, FlowDescriptionPanel } from "./panels/ProjectsPanels";
import { ContactFormPanel } from "./panels/ContactPanels";

// Single source of truth for the book's chapters — drives the cover's
// chapter list, the right-edge page-mark tabs, and each chapter's
// two-page spread (BookPage.js): clicking a `subItems` entry swaps the
// book's pages to that entry's content, instead of navigating away.
// Each `subItems` entry is either:
//   - `{ id, label, Panel }` — a single-page item; the left page renders
//     `Panel`, the right page holds only the Next control (Experience,
//     Contact's "Send a Message").
//   - `{ id, label, href }` — an action link, not a page: clicking it in
//     the checklist opens `href` directly (external link or `mailto:`)
//     instead of calling `setPageIndex`, so `pageIndex` never points at
//     one of these — Back/Next only ever step between entries that have
//     a `Panel`/`LeftPanel` (Contact's Email/LinkedIn/GitHub).
//   - `{ id, label, LeftPanel, RightPanel, rightLabel? }` — a fixed
//     two-page spread; the left page renders `LeftPanel` under the
//     `Chapter N / label` heading, the right page renders `RightPanel`
//     in full (not a dimmed preview) — used where the two halves are
//     one unit meant to be read side by side, like a screenshot next to
//     its description (Skills, Projects). `rightLabel`, when given,
//     renders as a matching heading above `RightPanel` (no "Chapter N"
//     prefix, since it's the same chapter as the left page) — used when
//     `RightPanel` is bare content with no heading of its own (Skills'
//     `DevEnvironmentPanel`). Omit it when `RightPanel` already renders
//     its own heading internally (Projects' `FlowDescriptionPanel`).
//
// Every chapter also has `bentoTiles: [{ id, span, title?, bare?, Tile }]` —
// used instead of the page-turning spread below `md` (BookBentoPage.js),
// where the chapter is one scrolling 2-column bento grid. `span: 2` is a
// full-width tile, `span: 1` half; `title` adds a small heading inside the
// tile; `bare` renders `Tile` without the wrapper card (for `Tile`s that
// already draw their own card/border).
//
// A chapter can optionally add `checklist: [{ label, pageIndex } | {
// label, href }]` — the overview page's numbered list, decoupled from
// `subItems`/pagination. Without it, the checklist defaults to one row
// per `subItems` entry (1:1). With it, multiple rows can point at the
// *same* `pageIndex` (e.g. two role names that share one paired page) —
// this lists every name the user expects to see without turning
// Back/Next into a step-through-duplicates tour: paging only ever
// visits real `subItems` entries, never repeats a page just because two
// checklist rows point at it.
const bookChapters = [
  {
    id: "skills",
    title: "Skills & Stack",
    subtitle: "Tools of the Craft",
    description:
      "The languages, frameworks, and tools behind the work in this archive.",
    icon: skillsIcon,
    // One real page (Tech Stack left + Dev Environment right), but the
    // checklist still lists both names ("I Tech Stack" / "II Dev
    // Environment") via `checklist` — both rows point at `pageIndex: 0`,
    // so clicking either opens the same page, but there's no second
    // `subItems` entry for Next to step into (which is what made an
    // earlier duplicate-`subItems` version of this feel like a bug —
    // Next used to open what looked like the identical page again).
    subItems: [
      {
        id: "skills-tech-stack",
        label: "Tech Stack",
        LeftPanel: TechStackPanel,
        RightPanel: DevEnvironmentPanel,
        rightLabel: "Dev Environment",
      },
    ],
    checklist: [
      { label: "Tech Stack", pageIndex: 0 },
      { label: "Dev Environment", pageIndex: 0 },
    ],
    bentoTiles: [
      { id: "tech-stack", span: 2, title: "Tech Stack", Tile: TechStackBento },
      { id: "dev-environment", span: 2, title: "Dev Environment", Tile: DevEnvironmentBento },
    ],
  },
  {
    id: "experience",
    title: "Work Experience",
    subtitle: "Paths Walked",
    description: "Three roles, three teams, one throughline of building things.",
    icon: experienceIcon,
    // First two roles share one page (PT. Inovasi left, PT. Tjakrabirawa
    // right) per user request — each `ExperienceDetailsPanel` always
    // renders its own company/role/period heading internally (the
    // company name belongs inside the card, per user request — not
    // hidden there). The third role (odd one out, nothing left to pair
    // it with) is a plain single-page entry — no tech stack on the
    // right, just Next (an earlier pass paired it with
    // `ExperienceStackPanel`; removed per user request). The checklist
    // still lists all three company names via `checklist` (`pageIndex:
    // 0` for both roles on the shared page, `pageIndex: 1` for the
    // third) — Next only ever steps between the 2 real `subItems`
    // pages, never replays the shared page as its own step.
    //
    // `hideLeftLabel: true` on the entries whose card already shows the
    // company name — BookPage.js's outer "Chapter N / label" heading
    // would otherwise repeat it above the card, so it shows the
    // chapter's own `title` ("Work Experience") instead of the company
    // name there, rather than sitting blank. `alignRightTop` (an
    // invisible spacer, no visible label at all) is the same idea
    // applied to the right column, for `RightPanel`s with no `rightLabel`.
    subItems: [
      {
        id: "experience-0",
        label: experiences[0].company,
        LeftPanel: () => <ExperienceDetailsPanel index={0} />,
        RightPanel: () => <ExperienceDetailsPanel index={1} />,
        alignRightTop: true,
        hideLeftLabel: true,
      },
      {
        id: "experience-2",
        label: experiences[2].company,
        Panel: () => <ExperienceDetailsPanel index={2} />,
        hideLeftLabel: true,
      },
    ],
    checklist: [
      { label: experiences[0].company, pageIndex: 0 },
      { label: experiences[1].company, pageIndex: 0 },
      { label: experiences[2].company, pageIndex: 1 },
    ],
    bentoTiles: [{ id: "experience-carousel", span: 2, bare: true, Tile: ExperienceCarousel }],
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Chapters Written",
    description: "Personal projects built end to end, from idea to deployment.",
    icon: projectsIcon,
    subItems: [
      {
        id: "project-flow",
        label: "FLOW — Finance Tracker",
        LeftPanel: FlowScreenshotPanel,
        RightPanel: FlowDescriptionPanel,
      },
    ],
    bentoTiles: [
      { id: "flow-screenshot", span: 2, bare: true, Tile: FlowScreenshotPanel },
      { id: "flow-description", span: 2, Tile: FlowDescriptionPanel },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Write the Next Page",
    description: "Open to new opportunities, collaborations, or a friendly chat.",
    icon: contactIcon,
    // No overview Next button — the checklist is mostly direct links, and
    // Next is only wanted at the start of chapters 1–3.
    hideOverviewNext: true,
    // Mobile: the container fills its whole screen and the form stretches
    // to fill it (other chapters hug their content).
    fillScreen: true,
    bentoTiles: [
      { id: "contact-form", span: 2, title: "Send a Message", Tile: ContactFormPanel },
    ],
    subItems: [
      {
        id: "contact-email",
        label: "Email",
        href: "mailto:firlianrifqi22@gmail.com",
      },
      {
        id: "contact-linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/rifqi-firlian/",
      },
      {
        id: "contact-github",
        label: "GitHub",
        href: "https://github.com/rifqi-dev",
      },
      {
        id: "contact-form",
        label: "Send a Message",
        Panel: ContactFormPanel,
        // No Next control here — it's the last pageable entry in the
        // last chapter, submitting the form is the natural end of the
        // flow, and Next would otherwise just wrap around to Skills.
        hideNext: true,
      },
    ],
  },
];

export default bookChapters;
